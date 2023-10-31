import { TWeatherApi } from '@/app/types/type';
import { Http } from '../../interceptor';
const weatherApi = async (location: TWeatherApi) => {
    try {
        return Http.get(`current.json?q=${location}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

export default weatherApi;
