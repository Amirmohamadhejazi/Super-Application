import { githubApiGetUserRepos } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Error, Loading, NoData } from '../..';
import { toast } from 'react-toastify';
import calculator from './components/utils/calculator';
import { Button, CopyButton, Pagination, Select } from '@mantine/core';
import { Tooltip } from '@mui/material';
import { VscRepoForked } from 'react-icons/vsc';
import { AiOutlineStar } from 'react-icons/ai';
import { format } from 'date-fns';
import { tikeImg } from '@public/picture';
import { useSearchParams } from 'next/navigation';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

const SearchRepoUser = ({ inputSearch, dataUser }: any) => {
    const searchParams = useSearchParams();
    const currentTab = Number(searchParams.get('pageRepository')) || 1;
    const [, setQuery] = useQueryParam('pageRepository', NumberParam);
    const reposType = searchParams.get('reposType') || 'created';
    const [, setReposType] = useQueryParam('reposType', StringParam);
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: [
            'searchRepoUser',
            {
                inputSearch,
                currentTab,
                reposType
            }
        ],
        queryFn: () =>
            inputSearch &&
            githubApiGetUserRepos({
                inputSearch: inputSearch,
                pageDataRepos: currentTab,
                sortReposType: reposType
            }),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    // const repoHandler = () => {
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (isError) {
        toast.error(error?.message);
        return (
            <div className="w-full flex items-center justify-center">
                <Error />
            </div>
        );
    }

    if (isSuccess) {
        const { convertRepData } = calculator(data);
        const page = Math.ceil(dataUser?.public_repos / 30);

        if (convertRepData.length === 0) {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <NoData text="This user dont have Repository!" />
                </div>
            );
        }

        const typeReposHandler = (data: string) => {
            setReposType(data);
        };

        return (
            <div className="flex flex-col gap-y-5 m-1">
                <div className="flex gap-2 justify-between items-center flex-wrap">
                    <span className="text-lg font-semibold">
                        Repositories: (<span className="text-sm">{dataUser?.public_repos}</span>)
                    </span>
                    <div className="flex items-center flex-wrap-reverse gap-2">
                        <Select
                            size="sm"
                            placeholder="Sort by:"
                            data={['created', 'updated', 'pushed', 'full_name']}
                            onChange={(e: any) => typeReposHandler(e)}
                            value={reposType}
                            searchable
                        />
                        {page > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    total={page}
                                    value={currentTab}
                                    onChange={(e) => setQuery(e)}
                                    color="orange"
                                    size="sm"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {convertRepData.map((itemsRepo: any) => (
                        <div
                            className="flex flex-col p-1 hover:scale-[102%] bg-slate-300 z-30 shadow-md hover:bg-slate-800 text-black hover:text-white transition-all duration-100 rounded-md"
                            key={itemsRepo.id}
                        >
                            <div className="grid grid-cols-3 gap-x-2">
                                <div className="col-span-2 flex justify-start items-center gap-x-2 truncate">
                                    <div className="w-7 h-w-7 bg-slate-600 rounded-full p-0.5">
                                        <div className="h-full w-full brightness-75 rounded-full overflow-hidden">
                                            <img
                                                src={itemsRepo.avatarOwner}
                                                className="w-full h-full object-cover"
                                                alt="itemsRepo.avatarOwner"
                                            />
                                        </div>
                                    </div>
                                    <a
                                        href={itemsRepo.url}
                                        target="_blank"
                                        className=" truncate"
                                        title={itemsRepo.name}
                                    >
                                        <span className="text-sm font-medium ">{itemsRepo.name} </span>
                                    </a>
                                </div>

                                {itemsRepo.topics.length > 0 && (
                                    <div className="col-span-1 flex justify-end items-start truncate">
                                        <Tooltip
                                            title={
                                                <React.Fragment>
                                                    <div className="w-full flex-wrap flex items-center gap-1 ">
                                                        {itemsRepo.topics.map((itemsTopic: any, index: number) => (
                                                            <div
                                                                className="text-xs text-black font-medium bg-blue-200 px-2 py-1 rounded-md"
                                                                key={index}
                                                            >
                                                                <span>{itemsTopic}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </React.Fragment>
                                            }
                                            placement="top"
                                            arrow
                                        >
                                            <span
                                                className={`text-white font-semibold text-xs cursor-pointer shadow-sm  bg-slate-600 px-1 py-1 rounded-md`}
                                            >
                                                # tags ({itemsRepo.topics.length})
                                            </span>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between my-2">
                                <div
                                    className={`flex gap-x-2 text-xs font-semibold my-1 ${
                                        !itemsRepo?.language && 'opacity-0'
                                    }`}
                                >
                                    <span>lang: </span>

                                    <div className="flex items-center gap-x-2">
                                        <div className="bg-blue-400 rounded-full p-1"></div>
                                        <span className="text-xs">{itemsRepo?.language}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <div className="flex items-center  ">
                                        <span className="text-sm">{itemsRepo.forks}</span>
                                        <VscRepoForked className="text-lg" />
                                    </div>
                                    <div className="flex items-center  ">
                                        <span className="text-sm">{itemsRepo.watchers_count}</span>
                                        <AiOutlineStar className="text-lg" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-1">
                                <span className="col-span-1 flex justify-start text-xs font-semibold  ">
                                    Created :<span>{format(new Date(itemsRepo.created_at), 'yyyy-MM-dd')}</span>
                                </span>
                                <span className="col-span-1 flex justify-start xl:justify-end text-xs font-semibold ">
                                    Updated :<span>{format(new Date(itemsRepo.updated_at), 'yyyy-MM-dd')}</span>
                                </span>

                                <span className="col-span-1 flex justify-start text-xs font-semibold ">
                                    Pushed :<span>{format(new Date(itemsRepo.pushed_at), 'yyyy-MM-dd')}</span>
                                </span>
                            </div>

                            <div className="flex items-end justify-between mt-2">
                                <div
                                    className="flex"
                                    onClick={() => toast.success(`link repository ${itemsRepo.name} copied!`)}
                                >
                                    <CopyButton value={itemsRepo.clone_url}>
                                        {({ copied, copy }) => (
                                            <Button
                                                className={`${
                                                    copied ? 'bg-gray-600' : 'bg-gray-500'
                                                } text-white text-sm px-2 focus:ring-0 focus:outline-none  rounded hover:bg-gray-600 transition-all duration-200`}
                                                onClick={copy}
                                            >
                                                {copied ? 'Copied' : 'Copy url'}
                                            </Button>
                                        )}
                                    </CopyButton>
                                </div>
                                {itemsRepo.homepageUrl && (
                                    <a
                                        href={itemsRepo.homepageUrl}
                                        className="flex font-semibold text-sm items-center text-white bg-teal-700 p-1 rounded-md gap-x-1"
                                        target="_blank"
                                    >
                                        <span>live</span>
                                        <img src={tikeImg.src} className="w-5" alt={tikeImg.src} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default SearchRepoUser;
