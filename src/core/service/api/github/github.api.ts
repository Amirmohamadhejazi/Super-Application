import { Http } from '../../interceptor';
Http.defaults.baseURL = 'https://api.github.com';

export const githubApiGetUser = async (dataInput: string) => {
    try {
        return Http.get(`/users/${dataInput}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};
export const githubApiGetUserRepos = async ({
    inputSearch,
    pageDataRepos
}: {
    inputSearch: string;
    pageDataRepos: number;
}) => {
    try {
        return Http.get(`/users/${inputSearch}/repos?page=${pageDataRepos}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};
