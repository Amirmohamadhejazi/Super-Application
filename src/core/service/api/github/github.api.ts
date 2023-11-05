import { Http } from '../../interceptor';
Http.defaults.baseURL = 'https://api.github.com';

export const githubApiGetUser = async (dataInput: string) => {
    try {
        return Http.get(`/users/${dataInput}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};
export const githubApiGetUserOrgan = async (dataInput: string) => {
    try {
        return Http.get(`/users/${dataInput}/orgs`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};
export const githubApiGetUserRepos = async ({
    inputSearch,
    pageDataRepos,
    sortReposType
}: {
    inputSearch: string;
    pageDataRepos: number;
    sortReposType: string;
}) => {
    try {
        return Http.get(`/users/${inputSearch}/repos?page=${pageDataRepos}&sort=${sortReposType}`).then(
            (res) => res.data
        );
    } catch (error: any) {
        return error.response?.data;
    }
};
export const githubApiGetUserFollowersAndFollowing = async ({
    inputSearch,
    type,
    pageDataFollowersAndFollowing
}: {
    inputSearch: string;
    type: string;
    pageDataFollowersAndFollowing: number;
}) => {
    try {
        return Http.get(`/users/${inputSearch}/${type}?page=${pageDataFollowersAndFollowing}`).then((res) => res.data);
    } catch (error: any) {
        return error.response?.data;
    }
};
