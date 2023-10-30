'use client';
import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { citiesData } from '@/app/data/citiesIran';
import { TCitiesData } from '@/app/types/type';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@/core/api';
import { Error, Loading } from '@/app/components';
const Weather = () => {
    const [location, setLocation] = useState<string>('36.5633,53.0601');

    const dataSelect = citiesData.map((items: TCitiesData) => {
        return {
            value: `${items.lat},${items.lng}`,
            label: items.city
        };
    });

    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['WeatherQuery', { location }],

        queryFn: () => weatherApi(location ? location : '36.5633,53.0601')
    });

    const QueryHandler = () => {
        if (isLoading) {
            return <Loading />;
        }

        if (isError) {
            return <Error />;
        }

        if (isSuccess) {
            let dataApi;
            if (location && location.length !== 0) {
                const data = citiesData.filter(
                    (items) => items.city === dataSelect.filter((items) => items.value === location)[0].label
                )[0];
                dataApi = data;
            }
            console.log(dataApi);
            console.log(data);

            // const test = [
            //     {
            //         location: {
            //             name: 'Tehran',
            //             region: 'Tehran',
            //             localtime: '2023-10-30 13:54'
            //         },
            //         current: {
            //             last_updated: '2023-10-30 13:45',
            //             temp_c: 26,
            //             is_day: 1,
            //             // 0 false 1 true
            //             condition: {
            //                 text: 'Partly cloudy',
            //                 icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
            //             },
            //             wind_kph: 11.2,
            //             // باد کیلومتر در ساعت
            //             wind_degree: 190,
            //             // درجه باد
            //             wind_dir: 'S',
            //             // جهت باد
            //             humidity: 15,
            //             // رطوبت
            //             cloud: 75,
            //             // ابر
            //             gust_kph: 7.9
            //             // تند باد کیلومتر در ساعت
            //         }
            //     }
            // ];

            return (
                <div className="flex w-full bg-red-200 ">
                    <img src={data?.current?.condition?.icon} alt="" />
                </div>
            );
        }
    };
    return (
        <div className="container flex flex-col gap-y-2 items-center pt-5 mx-auto">
            {/* <span className="text-xl font-bold"> , </span> */}
            <div className="w-full flex ">
                <div className="flex gap-x-3 justify-center items-center w-full">
                    <span>Right Now in</span>
                    <div className=" flex items-center ">
                        <Select
                            className="border-0"
                            placeholder="Pick value"
                            data={dataSelect}
                            clearable
                            onChange={(e: any) => setLocation(e)}
                            searchable
                        />
                    </div>
                    <span>its clear</span>
                </div>
            </div>

            <QueryHandler />
        </div>
    );
};

export default Weather;
