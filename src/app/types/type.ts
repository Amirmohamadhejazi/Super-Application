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

export type { IItemShop, TWeatherApi, TCitiesData };
