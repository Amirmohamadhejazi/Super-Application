import { TWeatherApi } from '@/app/types/type';
import { Http } from '../../interceptor';
Http.defaults.baseURL = 'https://weatherapi-com.p.rapidapi.com/';
Http.interceptors.request.use((config: any) => {
    config.headers['X-RapidAPI-Key'] = '62bacccf5fmsh40048f12c6fbc99p1e9e29jsn63a283b704c6';
    config.headers['X-RapidAPI-Host'] = 'weatherapi-com.p.rapidapi.com/';

    return config;
});
const weatherApi = async (location: TWeatherApi) => {
    try {
        return Http.get(`current.json?q=${location}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

export default weatherApi;
