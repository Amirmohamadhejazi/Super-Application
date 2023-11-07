export default function paginateArray(dataArray: any[], itemsPerPage: number, currentPage: number) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const dataPage = dataArray.slice(startIndex, endIndex);
    if (dataPage.length > 0) return dataPage;
    else return null;
}
