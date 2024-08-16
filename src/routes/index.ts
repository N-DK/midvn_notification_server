import { Express } from 'express';
import notificationRoute from './notification.route';
import templeNotificationRoute from './templeNotification.route';

export default (app: Express) => {
    notificationRoute(app);
    templeNotificationRoute(app);
};
