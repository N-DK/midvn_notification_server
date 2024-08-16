import { Request, Response } from 'express';
import catchAsync from '../helper/catchAsync.helper';
import { CREATED, DELETE, GET, UPDATE } from '../core/success.response';
import templeNotificationService from '../services/templeNotification.service';

class TempleNotificationController {
    getAllTemplateNotification = catchAsync(
        async (req: Request, res: Response) => {
            const data =
                await templeNotificationService.getAllTemplateNotification();

            GET(res, data);
        },
    );

    getKeywordTemplateNotification = catchAsync(
        async (req: Request, res: Response) => {
            const params = req.params;

            const data =
                await templeNotificationService.getKeywordTemplateNotification(
                    params,
                );

            GET(res, data);
        },
    );

    createTemplateNotification = catchAsync(
        async (req: Request, res: Response) => {
            const body = req.body;

            const data =
                await templeNotificationService.createTemplateNotification(
                    body,
                );

            CREATED(res, data);
        },
    );

    deleteTemplateNotification = catchAsync(
        async (req: Request, res: Response) => {
            const params = req.params;

            const data =
                await templeNotificationService.deleteTemplateNotification(
                    params,
                );

            DELETE(res, data);
        },
    );

    updateTemplateNotification = catchAsync(
        async (req: Request, res: Response) => {
            const params = req.params;
            const body = req.body;

            const data =
                await templeNotificationService.updateTemplateNotification(
                    params,
                    body,
                );

            UPDATE(res, data);
        },
    );
}

export default new TempleNotificationController();
