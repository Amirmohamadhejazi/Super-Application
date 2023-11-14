import { Http } from '../../interceptor';

const fortniteApiShop = async () => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/shop/br`).then((res) => res.data.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

// cosmetics List
// cosmetics/br
// All
const fortniteApiCosmeticsAll = async () => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/cosmetics/br`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

// new cosmetics
// cosmetics/br/new
const fortniteApiCosmeticsNew = async () => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/cosmetics/br/new`).then((res) => res.data.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

// cosmetics by ID (detail)
// cosmetics/br/{cosmetic-id}
const fortniteApiCosmeticsSearchById = async (id: string) => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/cosmetics/br/${id}`).then((res) => res.data.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

const fortniteApiBattleRoyalNews = async () => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/news`).then((res) => res.data.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

// cosmetics Search
// cosmetics/br/search

const fortniteApiCosmeticsSearchByName = async (inputText: any) => {
    Http.defaults.baseURL = 'https://fortnite-api.com/v2';
    Http.interceptors.request.use((config: any) => {
        config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
        return config;
    });
    try {
        return Http.get(`/cosmetics/br/search/all${inputText && `?name=${inputText}`}`).then((res) => res.data.data);
    } catch (error: any) {
        return error.response?.data;
    }
};

// const fortniteApiSearch = async () => {
//     Http.defaults.baseURL = 'https://fortnite-api.com/v2';
//     Http.interceptors.request.use((config: any) => {
//         config.headers['Authorization'] = '410fd76e-4256-4357-9c21-d088c401c992';
//         return config;
//     });
//     try {
//         return Http.get(`/stats/br/v2/ninja`).then((res) => res.data.data);
//     } catch (error: any) {
//         return error.response?.data;
//     }
// };

// battle royal news
// news

// stw news
// news/stw

export {
    fortniteApiShop,
    fortniteApiCosmeticsNew,
    fortniteApiCosmeticsSearchById,
    fortniteApiCosmeticsAll,
    fortniteApiBattleRoyalNews,
    fortniteApiCosmeticsSearchByName
};
