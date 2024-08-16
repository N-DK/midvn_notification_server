import { BusinessLogicError } from '../core/error.response';
import { getConnection } from '../dbs/init.mysql';
import templeNotificationModel from '../models/templeNotification.model';

class TempleNotificationService {
    async getAllTemplateNotification() {
        try {
            const { conn: con } = await getConnection();
            try {
                const data = await templeNotificationModel.getAll(con);
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

    async getKeywordTemplateNotification(params: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data = await templeNotificationModel.getByKeyword(
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

    async createTemplateNotification(body: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data =
                    await templeNotificationModel.createTemplateNotification(
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

    async deleteTemplateNotification(param: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data =
                    await templeNotificationModel.deleteTemplateNotification(
                        con,
                        param,
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

    async updateTemplateNotification(params: any, body: any) {
        try {
            const { conn: con } = await getConnection();
            try {
                const data =
                    await templeNotificationModel.updateTemplateNotification(
                        con,
                        params,
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
}

export default new TempleNotificationService();
