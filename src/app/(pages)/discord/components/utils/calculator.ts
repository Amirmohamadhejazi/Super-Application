type TBadge = {
    icon: string;
    description: string;
    link: string;
    id: string;
};

type TConnected_accounts = {
    type: string;
    id: string;
    name: string;
    verified: boolean;
};

const calculator = (data: any) => {
    const dataConvert = {
        user: {
            id: data.user.id,
            username: data.user.username,
            global_name: data.user.global_name,
            legacy_username: data.legacy_username,
            avatar: data.user.avatar,
            avatar_decoration_data: {
                asset: data?.user.avatar_decoration_data?.asset,
                sku_id: data?.user.avatar_decoration_data?.sku_id
            },
            banner: data.user.banner,
            banner_color: data.user.banner_color,
            bio: data.user.bio
        },
        connected_accounts: data.connected_accounts.map((items: TConnected_accounts) => {
            return {
                type: items.type,
                id: items.id,
                name: items.name,
                verified: items.verified
            };
        }),
        user_profile: {
            bio: data.user_profile.bio,
            banner: data.user_profile.banner
        },
        badges: data.badges.map((items: TBadge) => {
            return {
                icon: items.icon,
                description: items.description,
                link: items.link,
                id: items.id
            };
        })
    };
    return dataConvert;
};

export default calculator;
