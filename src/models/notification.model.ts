import { PoolConnection } from 'mysql2';
import { BusinessLogicError } from '../core/error.response';
import admin from '../utils/firebase/firebaseAdmin';
import DatabaseModel from './database.model';
import { tables } from '../constants/tableName.constant';

class NotificationModel extends DatabaseModel {
    async sendNotification(con: PoolConnection, notificationBody: any) {
        const { keyword, replaces, user_id } = notificationBody;

        const [templateNotification] = (await this.select(
            con,
            tables.tableTemplateNotification,
            '*',
            'keyword = ?',
            [keyword],
        )) as any[];

        Object.entries(replaces).forEach(([key, value]) => {
            templateNotification.title = templateNotification.title.replace(
                `{${key}}`,
                value,
            );
            templateNotification.content = templateNotification.content.replace(
                `{${key}}`,
                value,
            );
        });

        const { title, content: body } = templateNotification;

        let userTokens;
        if (['2', '3'].includes(keyword.split('_')[0])) {
            const users = (await this.select(
                con,
                tables.tableUser,
                'user_id',
                'parent_id = ?',
                [user_id],
            )) as any[];

            let userIds = users?.map((item) => item.user_id).join(',');
            userIds =
                userIds.trim() === '' ? user_id : `${user_id}, ${userIds}`;

            const whereClause = `user_id IN (${userIds})`;

            userTokens = await this.select(
                con,
                tables.tableTokenFirebase,
                '*',
                whereClause,
            );
        } else {
            const whereClause = user_id
                ? `user_id IN (${user_id})`
                : 'user_id IS NOT NULL';
            userTokens = await this.select(
                con,
                tables.tableTokenFirebase,
                '*',
                whereClause,
            );
        }

        let tokens = (userTokens as any[]).map((item) => item.token);

        const messages = tokens.map((token) => ({
            notification: { title, body },
            token,
        }));

        try {
            const response = await admin.messaging().sendEach(messages);

            console.log(`Đã gửi thành công ${response.successCount} thông báo`);

            response.responses.forEach((result, index) => {
                const error = result.error;
                if (error) {
                    // Xóa token không hợp lệ
                    if (
                        error.code ===
                        'messaging/registration-token-not-registered'
                    ) {
                        // Xử lý logic xóa token trong cơ sở dữ liệu của bạn
                        console.log(
                            'Token không hợp lệ, cần phải xóa:',
                            tokens[index],
                        );
                    }
                }
            });

            if (response.successCount > 0) {
                await this.insert(con, tables.tableNotification, {
                    user_id: user_id ?? null,
                    description: body,
                    is_seen: 0,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                });
            }

            return response;
        } catch (error: any) {
            throw new BusinessLogicError(error.message);
        }
    }

    async seenNotification(con: PoolConnection, param: any) {
        try {
            const { id } = param;
            const data = await this.update(
                con,
                tables.tableNotification,
                { is_seen: 1, updated_at: Date.now() },
                'id',
                [id],
            );
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getNotification(con: PoolConnection, param: any) {
        try {
            const { user_id } = param;
            const data = await this.select(
                con,
                tables.tableNotification,
                '*',
                'user_id = ? OR user_id IS NULL',
                [user_id],
            );
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new NotificationModel();
