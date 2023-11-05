type TDataSocial = {
    avatarOwner: string;
    name: string;
    url: string;
    clone_url: string;
    language: string;
    watchers_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepageUrl: string;
    topics: string[];
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
            created_at: itemsRep?.created_at,
            updated_at: itemsRep?.updated_at,
            pushed_at: itemsRep?.pushed_at,
            topics: itemsRep.topics,
            homepageUrl: itemsRep.homepage,
            id: itemsRep?.id
        };
    });

    return { convertRepData };
};

export default calculator;
