import express, { Express, Router } from 'express';
import { body, query, param } from 'express-validator';
import constants from '../constants/msg.constant';
import templeNotificationController from '../controllers/templeNotification.controller';

const router: Router = express.Router();

router.post(
    '/create-template-notification',
    [
        body('keyword', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('receiver', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('type', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('title', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('content', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
    ],
    templeNotificationController.createTemplateNotification,
);

router.delete(
    '/delete-template-notification/:keyword',
    [
        param('keyword', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
    ],
    templeNotificationController.deleteTemplateNotification,
);

router.get(
    '/get-template-notification',
    templeNotificationController.getAllTemplateNotification,
);

router.get(
    '/get-template-notification/:keyword',
    [
        param('keyword', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
    ],
    templeNotificationController.getKeywordTemplateNotification,
);

router.put(
    '/update-template-notification/:keyword',
    [
        body('receiver', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('type', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('title', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
        body('content', constants.NOT_EMPTY)
            .notEmpty()
            .isString()
            .withMessage(constants.VALIDATE_DATA)
            .escape(),
    ],
    templeNotificationController.updateTemplateNotification,
);

export default (app: Express) => {
    app.use('/api/v1/notification', router);
};
