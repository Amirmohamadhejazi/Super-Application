/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { citiesData } from '@/app/data/citiesIran';
import { TCitiesData } from '@/app/types/type';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@/core/api';
import { motion } from 'framer-motion';

import { Error, Loading } from '@/app/components';
import Wrapper from './components/Wrapper';
import Image from 'next/image';
import { BiWind } from 'react-icons/bi';
import { WiHumidity } from 'react-icons/wi';
import { LiaCloudSunSolid } from 'react-icons/lia';
const Weather = () => {
    const [location, setLocation] = useState<string>('36.5633,53.0601');
    const [temperatureType, setTemperatureType] = useState('f');
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

    if (isLoading) {
        return (
            <Wrapper dataSelect={dataSelect} setLocation={setLocation} data={data}>
                <Loading />
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper dataSelect={dataSelect} setLocation={setLocation} data={data}>
                <Error />
            </Wrapper>
        );
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
        // dataSelect: TCitiesData[];
        //     setLocation: any;

        return (
            <Wrapper dataSelect={dataSelect} setLocation={setLocation} data={data}>
                <div className=" w-full sm:w-auto flex flex-col gap-y-16 px-16 sm:px-0 ">
                    <div className="flex w-full flex-col sm:flex-row  font-normal items-center justify-center gap-x-24 mt-8 ">
                        <img
                            src={data?.current?.condition?.icon}
                            width={100}
                            height={100}
                            className="object-cover"
                            alt="s"
                        />
                        <span className="text-5xl">
                            {temperatureType === 'c' ? data?.current?.temp_c : data?.current?.temp_f}
                        </span>

                        <div className="w-full sm:w-auto flex flex-col gap-y-3">
                            <div className="flex gap-x-5 items-center  justify-between">
                                <BiWind className="text-4xl text-gray-700" />
                                <span className="text-xl font-normal">{data?.current?.wind_degree}</span>
                            </div>
                            <div className="flex gap-x-5 items-center  justify-between">
                                <LiaCloudSunSolid className="text-4xl text-gray-700" />
                                <span className="text-xl font-normal">{data?.current?.cloud}</span>
                            </div>
                            <div className="flex gap-x-5 items-center  justify-between">
                                <WiHumidity className="text-4xl text-gray-700" />
                                <span className="text-xl font-normal">{data?.current?.humidity}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-x-4 items-center justify-center">
                        {['f', 'c'].map((items, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${
                                    temperatureType === items ? 'bg-gray-700' : 'bg-gray-500'
                                } text-white px-4 focus:ring-0 focus:outline-none py-2 rounded hover:bg-gray-600 transition-all duration-200`}
                                onClick={() => setTemperatureType(items)}
                                type="button"
                            >
                                {items.toUpperCase()}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </Wrapper>
        );
    }
};

export default Weather;
