import { BusinessLogicError } from '../core/error.response';
import { getConnection } from '../dbs/init.mysql';
import notificationModel from '../models/notification.model';

class NotificationService {
    async sendNotification(body: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data = await notificationModel.sendNotification(
                    con,
                    body,
                );
                return data;
            } catch (error) {
                throw error;
            } finally {
                con.release();
            }
        } catch (error: any) {
            throw new BusinessLogicError(error.msg);
        }
    }

    async seenNotification(params: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data = await notificationModel.seenNotification(
                    con,
                    params,
                );
                return data;
            } catch (error) {
                throw error;
            } finally {
                con.release();
            }
        } catch (error: any) {
            throw new BusinessLogicError(error.msg);
        }
    }

    async getNotification(params: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data = await notificationModel.getNotification(
                    con,
                    params,
                );
                return data;
            } catch (error) {
                throw error;
            } finally {
                con.release();
            }
        } catch (error: any) {
            throw new BusinessLogicError(error.msg);
        }
    }
}
export default new NotificationService();
