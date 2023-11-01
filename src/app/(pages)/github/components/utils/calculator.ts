type TDataSocial = {
    avatarOwner: string;
    name: string;
    url: string;
    clone_url: string;
    language: string;
    watchers_count: number;
    id: number;
};
const calculator = (data: any = []) => {

    
    const convertRepData: TDataSocial[] = data?.map((itemsRep: any) => {
        return {
            avatarOwner: itemsRep?.owner?.avatar_url,
            name: itemsRep?.name,
            url: itemsRep?.html_url,
            clone_url: itemsRep?.clone_url,
            language: itemsRep?.language,
            watchers_count: itemsRep?.watchers_count,
            id: itemsRep?.id
        };
    });

    return { convertRepData };
};

export default calculator;
