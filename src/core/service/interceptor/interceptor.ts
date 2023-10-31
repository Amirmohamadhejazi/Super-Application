import axios from 'axios';

https: axios.interceptors.response.use(
    (response: any) => {
        return response;
    },
    async (error: any) => {
        // check if error is expected from backend
        try {
            if (error.response.status === 401) {
                Promise.reject(error.response);
            }
            const expectedError = error.response && error.response.state >= 400 && error.response.status < 500;

            // if error doesn't expected when we log it
            if (!expectedError) {
                // tweak it later
                // get error message from backend (see object of response later... maybe its changed)
                try {
                    // console.error(error)
                } catch (error) {}
            }
        } catch (error) {}
        return Promise.reject(error);
    }
);

if (window.location.pathname === '/discord') {
    axios.defaults.baseURL = 'https://discord.com/api/v9/';

    axios.interceptors.request.use((config: any) => {
        config.headers.Authorization = ``;
        // config.headers['Accept-Encoding'] = 'gzip, deflate, br';
        // config.headers['Accept-Language'] = 'en-US,en;q=0.9';
        // config.headers['Sec-Fetch-Dest'] = 'empty';
        // config.headers['Sec-Fetch-Mode'] = 'cors';
        // config.headers['Sec-Fetch-Site'] = 'same-origin';
        // config.headers['User-Agent'] =
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.188 Safari/537.36';
        // config.headers['X-Debug-Options'] = 'bugReporterEnabled';
        // config.headers['X-Discord-Locale'] = 'en-US';
        // config.headers['X-Discord-Timezone'] = 'Asia/Tehran';

        return config;
    });
}

if (window.location.pathname === '/weather') {
    axios.defaults.baseURL = 'https://weatherapi-com.p.rapidapi.com/';

    axios.interceptors.request.use((config: any) => {
        config.headers['X-RapidAPI-Key'] = '62bacccf5fmsh40048f12c6fbc99p1e9e29jsn63a283b704c6';
        config.headers['X-RapidAPI-Host'] = 'weatherapi-com.p.rapidapi.com/';

        return config;
    });
}
// will send token to headers request ( in x-auth-token body )

export default axios;
