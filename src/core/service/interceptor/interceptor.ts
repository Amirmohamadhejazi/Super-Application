import axios from 'axios';
axios.defaults.baseURL = 'https://weatherapi-com.p.rapidapi.com/';

axios.interceptors.response.use(
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

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config: any) => {
    config.headers['X-RapidAPI-Key'] = '62bacccf5fmsh40048f12c6fbc99p1e9e29jsn63a283b704c6';
    config.headers['X-RapidAPI-Host'] = 'weatherapi-com.p.rapidapi.com/';

    return config;
});
export default axios;
