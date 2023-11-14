import CustomLog from './CustomLog/CustomLog';
import paginateArray from './paginationFunc/paginationFunc';
import removeDuplicateObjects from './removeDuplicateObjects/removeDuplicateObjects';
import {
    iconSeries,
    dark,
    dc,
    frozen,
    gamingLegend,
    lava,
    marvel,
    shadow,
    slurp,
    starWars
} from '@public/picture/rarity';
import Spoiler from './Spoiler/Spoiler';
const bgChecker = (nameColor: string) => {
    switch (nameColor) {
        case 'common':
            return {
                color: '#40464d',
                bg: null
            };
        case 'uncommon':
            return {
                color: '#016604',
                bg: null
            };
        case 'rare':
            return {
                color: '#008DD4',
                bg: null
            };
        case 'epic':
            return {
                color: '#8A2BE2',
                bg: null
            };
        case 'legendary':
            return {
                color: '#de6e0e',
                bg: null
            };
        case 'mythic':
            return {
                color: '#B8860b',
                bg: null
            };
        case 'exotic':
            return {
                color: '#62bdbd',
                bg: null
            };
        case 'marvel':
            return {
                color: null,
                bg: marvel
            };
        case 'starwars':
            return {
                color: null,
                bg: starWars
            };
        case 'icon':
            return {
                color: null,
                bg: iconSeries
            };
        case 'gaminglegends':
            return {
                color: null,
                bg: gamingLegend
            };
        case 'lava':
            return {
                color: null,
                bg: lava
            };
        case 'dc':
            return {
                color: null,
                bg: dc
            };
        case 'dark':
            return {
                color: null,
                bg: dark
            };
        case 'frozen':
            return {
                color: null,
                bg: frozen
            };
        case 'shadow':
            return {
                color: null,
                bg: shadow
            };
        case 'slurp':
            return {
                color: null,
                bg: slurp
            };
        default:
            break;
    }
};

// [
//     'marvel', -----------------
//     'starwars', ---------------
//     'icon', -------------------
//     'gaminglegends',
//     'lava', --------------------
//     'dc', ----------------------
//     'dark', --------------------
//     'frozen', ------------------
//     'shadow', ------------------
//     'slurp',  ------------------
// ];
export { CustomLog, paginateArray, removeDuplicateObjects, bgChecker, Spoiler };
