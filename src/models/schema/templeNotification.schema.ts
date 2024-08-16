import { TempleNotificationType } from '../../types/templeNotification.type';

class TempleNotificationSchema {
    keyword: string;
    receiver: string;
    type: string;
    title: string;
    content: string;
    note: string;

    constructor({
        keyword,
        receiver,
        type,
        title,
        content,
        note,
    }: TempleNotificationType) {
        this.keyword = keyword;
        this.receiver = receiver;
        this.type = type;
        this.title = title;
        this.content = content;
        this.note = note;
    }
}

export default TempleNotificationSchema;

// step 1: create a tbl_temple_notification (id, keyword, receiver, message, status, created_at, updated_at)
// step 2: create a new route to post a notification
// step 3: create a tbl_notification
// step 4: send multiple notifications (1 million)
