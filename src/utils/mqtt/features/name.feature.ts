import { mylogger } from '../../../logger';

const nameFeature = async (client: any, data: any, requestId: any) => {
    try {
        if (!data || !Object.keys(data).length) return;
        // handle logic
    } catch (error) {
        console.log(error);
        mylogger.error('message', ['nameFeature', requestId, error]);
    }
};

export { nameFeature };
