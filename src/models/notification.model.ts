import { PoolConnection } from 'mysql2';
import { BusinessLogicError } from '../core/error.response';
import admin from '../utils/firebase/firebaseAdmin';
import DatabaseModel from './database.model';
import { tables } from '../constants/tableName.constant';

class NotificationModel extends DatabaseModel {
    async sendNotification(con: PoolConnection, notificationBody: any) {
        const { keyword, replaces, user_id } = notificationBody;
        const res = await this.select(
            con,
            tables.tableTemplateNotification,
            '*',
            'keyword = ?',
            [keyword],
        );
        var templeNotification = (res as any[])[0];
        Object.keys(replaces).forEach((key) => {
            templeNotification.title = templeNotification.title.replace(
                `{${key}}`,
                replaces[key],
            );
            templeNotification.content = templeNotification.content.replace(
                `{${key}}`,
                replaces[key],
            );
        });
        const { title, content: body } = templeNotification;

        if (keyword.split('_')[0] === '2' || keyword.split('_')[0] === '3') {
            // get all user_id by parent_user_id
            // create where in query string
            // for all user_id => sentence = 'user_id IN (1,2,3,4,5)'
            // where = 'user_id IN (item_1,...,item_n)'
            // const where = `user_id IN (${user_id})`;
            // const __res = await this.select(
            //     con,
            //     tables.tableTokenFirebase,
            //     '*',
            //     where,
            //     [user_id],
            // );
        }

        const __res_ = await this.select(
            con,
            tables.tableTokenFirebase,
            '*',
            `${user_id ? `user_id IN (${user_id})` : 'user_id IS NOT NULL'}`,
        );

        var tokens = (__res_ as any[])?.map((item) => item.token);

        const messages = tokens.map((token) => {
            return {
                notification: {
                    title,
                    body,
                },
                token,
            };
        });

        try {
            const response = await admin.messaging().sendEach(messages);
            if (response.failureCount === 0) {
                this.insert(con, tables.tableNotification, {
                    user_id: user_id ?? null,
                    description: body,
                    is_seen: 0,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                });
            }
            return response;
        } catch (error: any) {
            throw new BusinessLogicError(error.msg);
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
