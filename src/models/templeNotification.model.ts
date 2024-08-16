import { PoolConnection } from 'mysql2';
import DatabaseModel from './database.model';
import { tables } from '../constants/tableName.constant';

class TempleNotificationModel extends DatabaseModel {
    constructor() {
        super();
    }

    async getAll(con: PoolConnection) {
        try {
            const res = await this.select(
                con,
                tables.tableTemplateNotification,
                '*',
                'content IS NOT NULL',
                [],
                'id',
                'DESC',
                0,
                999999,
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getByKeyword(con: PoolConnection, params: any) {
        try {
            const keyword = params.keyword;

            const res = await this.select(
                con,
                tables.tableTemplateNotification,
                '*',
                'keyword = ?',
                [keyword],
                'id',
                'DESC',
                0,
                999999,
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async createTemplateNotification(con: PoolConnection, body: any) {
        try {
            const data = {
                keyword: body.keyword,
                receiver: body.receiver,
                type: body.type,
                title: body.title,
                content: body.content,
                note: body.note,
            };

            const res = await this.insert(
                con,
                tables.tableTemplateNotification,
                data,
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async deleteTemplateNotification(con: PoolConnection, param: any) {
        try {
            const keyword = param.keyword;

            const res = await this.delete(
                con,
                tables.tableTemplateNotification,
                'keyword = ?',
                [keyword],
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateTemplateNotification(
        con: PoolConnection,
        params: any,
        body: any,
    ) {
        try {
            const keyword = params.keyword;

            const data = {
                receiver: body.receiver,
                type: body.type,
                title: body.title,
                content: body.content,
            };

            const res = await this.update(
                con,
                tables.tableTemplateNotification,
                data,
                'keyword',
                [keyword],
            );
            return res;
        } catch (error) {
            throw error;
        }
    }
}

export default new TempleNotificationModel();
