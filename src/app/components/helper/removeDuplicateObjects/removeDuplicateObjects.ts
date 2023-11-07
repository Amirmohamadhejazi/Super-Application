export default function removeDuplicateObjects(arr: any) {
    if (arr) {
        const uniqueObjects: any = [];
        const seenObjects: any = {};

        for (const obj of arr) {
            const objString = JSON.stringify(obj);
            if (!seenObjects[objString]) {
                seenObjects[objString] = true;
                uniqueObjects.push(obj);
            }
        }

        return uniqueObjects;
    }
}
