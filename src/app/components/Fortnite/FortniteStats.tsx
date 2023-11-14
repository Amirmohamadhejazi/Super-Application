'use client';
import React, { useRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { fortniteApiCosmeticsSearchByName, fortniteApiSearch } from '@/core/service/api/fortnite/fortnite.api';
import { CartItemShopFort, Error, Loading, NoData } from '..';
import { toast } from 'react-toastify';
import { Spoiler, bgChecker } from '../helper';
import { FaGamepad, FaPlaystation } from 'react-icons/fa6';
import { MdOutlineTouchApp, MdPersonalVideo } from 'react-icons/md';
import { LiaBullseyeSolid } from 'react-icons/lia';
import { format } from 'date-fns';

const FortniteStats = () => {
    const formRef = useRef<any>(null);

    const [inputSearch, setInputSearch] = useState<string>('');

    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setInputSearch(dataInput);
        }
    };
    // search first
    const {
        isLoading,
        isError,
        error,
        isSuccess,
        data
    }: { isLoading: boolean; isError: boolean; error: any; isSuccess: boolean; data: any } = useQuery({
        queryKey: ['searchUserQuery', { inputSearch }],

        queryFn: () => inputSearch && fortniteApiSearch(inputSearch),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    const stateHandler = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            );
        }

        if (isError) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Error text={error.response.data.error} />
                </div>
            );
        }

        if (isSuccess) {
            if (!data) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="data Not found!" />
                    </div>
                );
            }

            const { stats, battlePass, account } = data;

            const typeGameHandler = (dataKey: string) => {
                const dataState = stats[dataKey];
                if (dataState) {
                    return [
                        { id: 0, name: 'overall', data: dataState?.overall },
                        { id: 1, name: 'solo', data: dataState?.solo },
                        { id: 2, name: 'duo', data: dataState?.duo },
                        { id: 3, name: 'trio', data: dataState?.trio },
                        { id: 4, name: 'squad', data: dataState?.squad },
                        { id: 5, name: 'ltm', data: dataState?.ltm }
                    ];
                }
            };
            const convertDataState = [
                {
                    name: 'All Platforms',
                    icon: null,
                    typeGames: typeGameHandler('all')
                },
                {
                    name: 'PC',
                    icon: <MdPersonalVideo className="text-2xl" />,
                    typeGames: typeGameHandler('keyboardMouse')
                },
                {
                    name: 'Gamepad',
                    icon: <FaGamepad className="text-2xl" />,
                    typeGames: typeGameHandler('gamepad')
                },
                {
                    name: 'Touch',
                    icon: <MdOutlineTouchApp className="text-2xl" />,
                    typeGames: typeGameHandler('touch')
                }
            ];

            return (
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col  font-medium">
                        <span className="text-xl font-bold">Account</span>
                        <span>
                            Name: <span className="text-sm">{account.name}</span>
                        </span>

                        <div className="flex gap-1 items-center">
                            <span>Account Id: </span>
                            <Spoiler>
                                <span className="text-sm "> {account.id}</span>
                            </Spoiler>
                        </div>
                    </div>
                    <hr className="border-2" />

                    <div className="flex flex-col  font-medium">
                        <span className="text-xl font-bold">States</span>
                        <hr className="border-dashed  my-3" />
                        <div className="flex flex-col  gap-4">
                            {convertDataState.map((itemState, index: number) => (
                                <div className="flex flex-col gap-1" key={index}>
                                    {itemState.typeGames && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold">{itemState.name}</span>
                                            {itemState.icon}
                                        </div>
                                    )}

                                    <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-7 rounded-xl ">
                                        {itemState.typeGames?.map(
                                            (itemsGames) =>
                                                itemsGames.data && (
                                                    <div
                                                        className="flex flex-col p-2 gap-1 rounded-md bg-slate-200 shadow-xl"
                                                        key={itemsGames.id}
                                                    >
                                                        <span className="text-lg font-bold">{itemsGames.name}</span>
                                                        <div className="flex flex-col gap-1 text-sm font-semibold">
                                                            <div className="flex items-center justify-between flex-wrap">
                                                                {' '}
                                                                <span className="flex items-center gap-2">
                                                                    Matches:{' '}
                                                                    {itemsGames.data.matches || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                                <span className="flex items-center gap-2">
                                                                    Score:{' '}
                                                                    {itemsGames.data.score || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between ">
                                                                <span className="flex items-center gap-2">
                                                                    kills:{' '}
                                                                    {itemsGames.data.kills || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                                {/* <span className="flex items-center gap-2">
                                                                    deaths:{' '}
                                                                    {itemsGames.data.deaths || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span> */}
                                                                <span className="flex items-center gap-2">
                                                                    K/D:{' '}
                                                                    {itemsGames.data.kd || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <span className="flex items-center gap-2">
                                                                    Wins:{' '}
                                                                    {itemsGames.data.wins || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                                <span className="flex items-center gap-2">
                                                                    WinRate:{' '}
                                                                    {itemsGames.data.winRate || (
                                                                        <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <span className="flex items-center gap-2">
                                                                Last Match:{' '}
                                                                {itemsGames.data.lastModified ? (
                                                                    format(
                                                                        new Date(itemsGames.data.lastModified),
                                                                        'yyyy-MM-dd'
                                                                    )
                                                                ) : (
                                                                    <LiaBullseyeSolid className="text-lg text-gray-500" />
                                                                )}
                                                            </span>
                                                          
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                    {/* {index !== convertDataState.length - 1 ||
                                        (itemState?.typeGames[index].data && <hr className="border-2 my-3" />)} */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    };
    return (
        <div className="w-full  flex flex-col  container items-center mx-auto ">
            <form className=" w-full sm:w-auto" ref={formRef} onSubmit={searchSubmit}>
                <TextInput
                    type="text"
                    placeholder="Enter useName Fortnite!"
                    size="lg"
                    name="search"
                    withErrorStyles={false}
                    rightSection={
                        <div className="text-xl">
                            <button type="submit">
                                <IoSearch className="cursor-pointer" />
                            </button>
                        </div>
                    }
                />
            </form>
            {stateHandler()}
        </div>
    );
};

export default FortniteStats;
