import express, { Express, Router } from 'express';
import { body, query, param } from 'express-validator';
import constants from '../constants/msg.constant';
import notificationController from '../controllers/notification.controller';

const router: Router = express.Router();

router.post(
    '/send-notification',
    [
        body('keyword', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA),
        body('replaces', constants.NOT_EMPTY)
            .notEmpty()
            .isObject()
            .withMessage(constants.VALIDATE_DATA),
    ],
    notificationController.sendNotification,
);

router.put(
    '/seen-notification/:id',
    [
        param('id', constants.NOT_EMPTY)
            .notEmpty()
            .isInt()
            .withMessage(constants.VALIDATE_DATA),
    ],
    notificationController.seenNotification,
);

router.get(
    '/get-notification/:user_id',
    [
        param('user_id', constants.NOT_EMPTY)
            .notEmpty()
            .isInt()
            .withMessage(constants.VALIDATE_DATA),
    ],
    notificationController.getNotification,
);

export default (app: Express) => {
    app.use('/api/v1/notification', router);
};
