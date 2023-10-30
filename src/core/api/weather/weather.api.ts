import { TWeatherApi } from '@/app/types/type';
import axios from 'axios';

const weatherApi = async (location: TWeatherApi) => {
    console.log(location);
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
    const options = {
        method: 'GET',

        headers: {
            'X-RapidAPI-Key': '62bacccf5fmsh40048f12c6fbc99p1e9e29jsn63a283b704c6',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return JSON.parse(result);
    } catch (error) {
        return error;
    }
    // try {
    //     return axios
    //         .get(`https://weatherapi-com.p.rapidapi.com/current.json`, {
    //             params: {
    //                 q: location
    //             },
    //             headers: {
    //                 'X-RapidAPI-Key': '62bacccf5fmsh40048f12c6fbc99p1e9e29jsn63a283b704c6',
    //                 'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    //             }
    //         })
    //         .then((res) => console.log(res.data));
    // } catch (error: any) {
    //     return error.response?.data;
    // }
};

export default weatherApi;
