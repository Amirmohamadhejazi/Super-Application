'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import discordApi from '@/core/service/api/discord/discord.api';

import Wrapper from './components/Wrapper';
import { Error, Loading, NoData } from '@/app/components';
import calculator from './components/utils/calculator';

const Discord = () => {
    const formRef = useRef<any>(null);
    const [inputSearch, setInputSearch] = useState<string>('');
    const [dataProfile, setDataProfile] = useState([]);

    // pic badge url
    // https://cdn.discordapp.com/badge-icons/[idBadge].png
    // pic banner
    // https://cdn.discordapp.com/banners/[userId]/[bannerID].[x ? gif : png];
    // useEffect(() => {
    //     discordApi();
    // }, []);

    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['searchDiscordQuery', { inputSearch }],

        queryFn: () => inputSearch && discordApi(inputSearch)
    });
    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length === 18) {
            setInputSearch(dataInput);
        }
    };

    if (isLoading) {
        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <Loading />
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <Error />
            </Wrapper>
        );
    }

    if (isSuccess) {
        if (!data) {
            return (
                <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                    <NoData text="User Not Found!" />
                </Wrapper>
            );
        }

        const convertData = calculator(data);

        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                {/* {convertData.user.username} */}
                <div className="flex flex-col items-start">
                    <div className="bg-gray-200 p-1 w-[330px] rounded-lg">
                        <div className="bg-gray-400 p-2  h-[100px] rounded-t-md relative">
                            <div className="w-16 h-1w-16 absolute left-3 -bottom-10 overflow-hidden rounded-full bg-black">
                                <img
                                    src={`https://cdn.discordapp.com/avatars/${convertData.user.id}/${convertData.user.avatar}.gif`}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col py-5 px-3 text-white mt-12">
                            <div className="flex flex-col bg-gray-700 rounded-md p-3">
                                <div className="flex flex-col gap-y-1">
                                    <span className="font-medium text-lg">{convertData.user.global_name}</span>
                                    <span className="font-light text-sm">{convertData.user.username}</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex flex-col gap-y-1">
                                    <span className="font-medium text-sm">About me!</span>
                                    <span className="text-xs font-sm">{convertData.user_profile.bio || ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
};

export default Discord;
