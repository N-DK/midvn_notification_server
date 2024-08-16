import { NextFunction, Request, Response } from 'express';
import catchAsync from '../helper/catchAsync.helper';
import notificationService from '../services/notification.service';
import { CREATED, GET, UPDATE } from '../core/success.response';

class NotificationController {
    sendNotification = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const data = await notificationService.sendNotification(req.body);
            CREATED(res, data);
        },
    );

    seenNotification = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const params = req.params;
            const data = await notificationService.seenNotification(params);
            UPDATE(res, data);
        },
    );

    getNotification = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const params = req.params;
            const data = await notificationService.getNotification(params);
            GET(res, data);
        },
    );
}

export default new NotificationController();
