import { NotificationType } from '../../types/notification.type';

class Notification {
    deviceToken: string;
    title: string;
    body: string;

    constructor({ deviceToken, title, body }: NotificationType) {
        this.deviceToken = deviceToken;
        this.title = title;
        this.body = body;
    }
}

export default Notification;
