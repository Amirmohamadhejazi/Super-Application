import { Http } from '../../interceptor';
Http.defaults.baseURL = 'https://discord.com/api/v9/';
Http.interceptors.request.use((config: any) => {
    config.headers.Authorization = 'tokenDiscord';
    return config;
});
const discordApi = async (dataInput: string) => {
    try {
        return Http.get(`users/${dataInput}/profile`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

export default discordApi;
