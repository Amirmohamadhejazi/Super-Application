import { Http } from '../../interceptor';

const discordApi = async (dataInput: string) => {
    try {
        return Http.get(`users/${dataInput}/profile`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

export default discordApi;
