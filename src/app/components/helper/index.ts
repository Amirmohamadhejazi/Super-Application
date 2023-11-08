import CustomLog from './CustomLog/CustomLog';
import paginateArray from './paginationFunc/paginationFunc';
import removeDuplicateObjects from './removeDuplicateObjects/removeDuplicateObjects';
const colorChecker = (nameColor: string) => {
    switch (nameColor) {
        case 'common':
            return '#40464d';
        case 'uncommon':
            return '#016604';
        case 'rare':
            return '#008DD4';
        case 'epic':
            return '#8A2BE2';
        case 'legendary':
            return '#de6e0e';
        case 'mythic':
            return '#B8860b';
        case 'exotic':
            return '#62bdbd';
        default:
            break;
    }
};

export { CustomLog, paginateArray, removeDuplicateObjects, colorChecker };
