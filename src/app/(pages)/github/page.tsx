'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Wrapper from './components/Wrapper';
import { Error, Loading, NoData } from '@/app/components';
import { toast } from 'react-toastify';
import { githubApiGetUser, githubApiGetUserRepos } from '@/core/service/api';
import Link from 'next/link';
import { RiTwitterXLine } from 'react-icons/ri';
import { BsLink45Deg } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { TbBuildingCommunity } from 'react-icons/tb';
import { format } from 'date-fns';
import calculator from './components/utils/calculator';
import { AiOutlineEye } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Pagination } from '@mantine/core';

const Github = () => {
    const formRef = useRef<any>(null);

    const [inputSearch, setInputSearch] = useState<string>('');
    const [pageDataRepos, setPageDataRepos] = useState<number>(1);

    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['searchUserQuery', { inputSearch }],

        queryFn: () => inputSearch && githubApiGetUser(inputSearch)
    });

    const {
        isLoading: isLoadingReposUser,
        isError: isErrorReposUser,
        error: errorReposUser,
        isSuccess: isSuccessReposUser,
        data: dataReposUser
    } = useQuery({
        queryKey: ['searchRepoUser', { inputSearch, pageDataRepos }],

        queryFn: () =>
            inputSearch &&
            githubApiGetUserRepos({
                inputSearch: inputSearch,
                pageDataRepos: pageDataRepos
            })
    });
 
    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setInputSearch(dataInput);
        }
    };

    if (isLoading) {
        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            </Wrapper>
        );
    }

    if (isError) {
        toast.error(error?.message);
        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            </Wrapper>
        );
    }

    if (isSuccess) {
        if (!data) {
            return (
                <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                    <div className="w-full flex items-center justify-center">
                        <NoData text="User Not Found!" />
                    </div>
                </Wrapper>
            );
        }

        const dataSocial = [
            {
                value: data.company,
                icon: <TbBuildingCommunity />,
                id: 1
            },
            {
                value: data.location,
                icon: <IoLocationOutline />,
                id: 2
            },
            {
                value: data.blog,
                icon: <BsLink45Deg />,
                id: 4
            },
            {
                value: data?.twitter_username && `https://twitter.com/${data.twitter_username}`,
                icon: <RiTwitterXLine />,
                id: 5
            }
        ];

        const repoHandler = () => {
            if (isLoadingReposUser) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <Loading />
                    </div>
                );
            }

            if (isErrorReposUser) {
                toast.error(errorReposUser?.message);
                return (
                    <div className="w-full flex items-center justify-center">
                        <Error />
                    </div>
                );
            }

            if (isSuccessReposUser) {
                const { convertRepData } = calculator(dataReposUser);
                const page = Math.ceil(data?.public_repos / 30);

                return (
                    <div className="flex flex-col gap-y-5">
                        <div className="flex gap-2 justify-between flex-wrap">
                            <span className="text-lg font-semibold">
                                Repositories: (<span className="text-sm">{data?.public_repos}</span>)
                            </span>
                            {page > 1 && (
                                <div className="flex justify-center">
                                    <Pagination
                                        total={page}
                                        value={pageDataRepos}
                                        onChange={(numPage) => setPageDataRepos(numPage)}
                                        color="orange"
                                        size="sm"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {convertRepData.map((itemsRepo) => (
                                <motion.div
                                    whileHover={{ scale: 1.009 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="p-1 bg-slate-300 z-30 shadow-md hover:bg-slate-800 text-black hover:text-white transition-all duration-100 rounded-md"
                                    key={itemsRepo.id}
                                >
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-7 h-w-7 bg-slate-600 rounded-full p-0.5">
                                            <div className="h-full w-full brightness-75 rounded-full overflow-hidden">
                                                <img
                                                    src={itemsRepo.avatarOwner}
                                                    className="w-full h-full object-cover"
                                                    alt="itemsRepo.avatarOwner"
                                                />
                                            </div>
                                        </div>
                                        <Link href={itemsRepo.url}>
                                            <span className="text-sm font-medium truncate ">{itemsRepo.name} </span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 mt-2">
                                        {itemsRepo.language && (
                                            <div className="flex items-center gap-x-2">
                                                <div className="bg-blue-400 rounded-full p-1"></div>
                                                <span className="text-xs">{itemsRepo.language}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-x-1">
                                            <AiOutlineEye className="text-lg" />
                                            <span className="text-sm">{itemsRepo.watchers_count}</span>
                                        </div>
                                    </div>
                                    <button
                                        className={`bg-gray-500 text-white text-sm px-2 focus:ring-0 focus:outline-none  rounded hover:bg-gray-600 transition-all duration-200`}
                                        onClick={() => console.log('asd')}
                                        type="button"
                                    >
                                        copy link clone
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            }
        };

        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2 ">
                    <div className="col-span-1 lg:col-span-1 p-1">
                        <div className="flex flex-col gap-y-2">
                            <div className="w-40 h-40 bg-blue-950 shadow-2xl rounded-full p-1">
                                <div className="h-full w-full rounded-full overflow-hidden">
                                    <img src={data.avatar_url} className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">{data.name}</span>
                                <span className="text-sm font-light">{data.login}</span>
                            </div>
                            <Link href={data.html_url}>
                                <div className="bg-gray-300 p-2 rounded-md text-center text-lg font-semibold">
                                    Go to Github
                                </div>
                            </Link>
                            <div className="flex flex-col">
                                <span>{data.bio}</span>
                                <div className="flex gap-x-2 text-sm">
                                    <span>
                                        {data.followers} <span className="font-medium">followers</span> .
                                    </span>
                                    <span>
                                        {data.following} <span className="font-medium">following</span>
                                    </span>
                                </div>
                                <span className="text-sm">
                                    Creation date: {format(new Date(data.created_at), 'yyyy-MM-dd')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                {dataSocial.map(
                                    (items) =>
                                        items.value && (
                                            <div className="w-full flex items-center gap-x-2 " key={items.id}>
                                                <div className="text-gray-600">{items.icon}</div>
                                                <span className="text-sm font-medium truncate" title={items.value}>
                                                    {items.value}
                                                </span>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3 overflow-auto bg-slate-200 p-1 rounded-md  ">
                        {repoHandler()}
                    </div>
                </div>
            </Wrapper>
        );
    }
};

export default Github;
