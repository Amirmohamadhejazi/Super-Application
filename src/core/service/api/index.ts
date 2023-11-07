import {
    fortniteApiShop,
    fortniteApiCosmeticsNew,
    fortniteApiCosmeticsSearchById,
    fortniteApiCosmeticsAll
} from './fortnite/fortnite.api';

import {
    githubApiGetUser,
    githubApiGetUserOrgan,
    githubApiGetUserRepos,
    githubApiGetUserFollowersAndFollowing
} from './github/github.api';
import weatherApi from './weather/weather.api';
import discordApi from './discord/discord.api';

export {
    weatherApi,
    discordApi,
    githubApiGetUser,
    githubApiGetUserOrgan,
    githubApiGetUserRepos,
    githubApiGetUserFollowersAndFollowing,
    fortniteApiShop,
    fortniteApiCosmeticsNew,
    fortniteApiCosmeticsSearchById,
    fortniteApiCosmeticsAll
};
