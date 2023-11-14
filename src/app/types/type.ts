interface IItemShop {
    name?: string;
    numbers?: number;
    brand?: string;
    id?: number;
}

type TWeatherApi = string;

type TCitiesData = {
    city: string;
    lat: string;
    lng: string;
    country: string;
    iso2: string;
    admin_name: string;
    capital: string;
    population: string;
    population_proper: string;
};

type TItemsShop = {
    name: string;
    description: string;
    type: string;
    rarity: {
        name: string;
        // color: string;
        bg: {
            color: string | null;
            bg: any;
        };
    };
    images: string;
    added: string;
    shopHistory: string[] | null;
    id: string | number;
};





interface GameType {
    id: number;
    name: string;
}

interface Stats {
    [key: string]: {
        [key: string]: any;
    };
}

interface ConvertData {
    name: string;
    icon: React.ReactNode | null;
    typeGames: { id: number; name: string; data: any }[];
}



export type { IItemShop, TWeatherApi, TCitiesData, TItemsShop , ConvertData , GameType  , Stats};
