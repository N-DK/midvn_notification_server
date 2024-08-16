import * as admin from 'firebase-admin';
import fs from 'fs';
import { setting } from '../../constants/setting.constant';

const serviceAccount = JSON.parse(
    fs.readFileSync(setting.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'),
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
