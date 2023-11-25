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

export default axios;
