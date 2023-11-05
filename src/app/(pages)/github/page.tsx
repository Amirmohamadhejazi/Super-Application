'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Wrapper from './components/Wrapper';
import { Error, Loading, NoData } from '@/app/components';
import { toast } from 'react-toastify';
import {
    githubApiGetUser,
    githubApiGetUserFollowersAndFollowing,
    githubApiGetUserOrgan,
    githubApiGetUserRepos
} from '@/core/service/api';
import { RiTwitterXLine } from 'react-icons/ri';
import { BsLink45Deg } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { TbBuildingCommunity } from 'react-icons/tb';
import { format } from 'date-fns';
import calculator from './components/utils/calculator';
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Button, CopyButton, Pagination, Modal } from '@mantine/core';
import Link from 'next/link';
import { Tooltip } from '@mui/material';

const Github = () => {
    const formRef = useRef<any>(null);
    const [openModal, setOpenModal] = useState({ open: false, type: '' });

    const [inputSearch, setInputSearch] = useState<string>('');
    const [pageDataRepos, setPageDataRepos] = useState<number>(1);
    const [pageDataFollowFollowing, setPageDataFollowFollowing] = useState<number>(1);

    // search first
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['searchUserQuery', { inputSearch }],

        queryFn: () => inputSearch && githubApiGetUser(inputSearch)
    });
    // search org first
    const {
        // isLoading: isLoadingOrgan,
        // isError: isErrorOrgan,
        // error: errorOrgan,
        isSuccess: isSuccessOrgan,
        data: dataOrgan
    } = useQuery({
        queryKey: ['searchUserOrganQuery', { inputSearch }],

        queryFn: () => inputSearch && githubApiGetUserOrgan(inputSearch)
    });

    // search Repository User
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

    // get user Followers and Following
    const {
        isLoading: isLoadingFollowersAndFollowing,
        isError: isErrorFollowersAndFollowing,
        error: errorFollowersAndFollowing,
        isSuccess: isSuccessFollowersAndFollowing,
        data: dataFollowersAndFollowing
    } = useQuery({
        queryKey: ['getFollowerAndFollowing', [inputSearch, openModal, pageDataFollowFollowing]],

        queryFn: () =>
            openModal.type !== '' &&
            githubApiGetUserFollowersAndFollowing({
                inputSearch: inputSearch,
                type: openModal.type,
                pageDataFollowersAndFollowing: pageDataFollowFollowing
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

        const organHandler = () => {
            if (isSuccessOrgan && dataOrgan.length > 0) {
                return (
                    <div className="flex flex-col mb-3">
                        <hr className="my-2" />
                        <span className="font-semibold text-sm mb-3">Organizations</span>
                        <div className="flex gap-2 flex-wrap">
                            {dataOrgan.map((itemsOrgans: any) => (
                                <div
                                    className="w-11 h-11 bg-gray-200 rounded-md p-1"
                                    key={itemsOrgans.id}
                                    title={itemsOrgans.login}
                                >
                                    <img
                                        src={itemsOrgans.avatar_url}
                                        className="object-cover rounded-md"
                                        alt={itemsOrgans.login}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
        };

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
                    <div className="flex flex-col gap-y-5 m-1">
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
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {convertRepData.map((itemsRepo) => (
                                <motion.div
                                    whileHover={{ scale: 1.009 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="flex flex-col p-1 bg-slate-300 z-30 shadow-md hover:bg-slate-800 text-black hover:text-white transition-all duration-100 rounded-md"
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
                                                                {itemsRepo.topics.map((itemsTopic, index) => (
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
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs font-semibold">
                                            Created:{' '}
                                            <span className=" ">
                                                {format(new Date(itemsRepo.created_at), 'yyyy-MM-dd | hh:mm aaa ')}
                                            </span>
                                        </span>
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
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            }
        };

        const followersAndFollowingHandler = () => {
            if (isLoadingFollowersAndFollowing) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <Loading />
                    </div>
                );
            }
            if (isErrorFollowersAndFollowing) {
                toast.error(errorFollowersAndFollowing?.message);
                return (
                    <div className="w-full flex items-center justify-center">
                        <Error />
                    </div>
                );
            }

            if (isSuccessFollowersAndFollowing) {
                if (!dataFollowersAndFollowing) {
                    return (
                        <div className="w-full flex items-center justify-center">
                            <NoData text="User Not Found!" />
                        </div>
                    );
                }
                const pageFollowers = data.followers;
                const pageFollowing = data.following;

                const page = Math.ceil(openModal.type === 'followers' ? pageFollowers / 30 : pageFollowing / 30);

                return (
                    <div className="flex flex-col gap-y-2">
                        {page > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    total={page}
                                    value={pageDataFollowFollowing}
                                    onChange={(numPage) => setPageDataFollowFollowing(numPage)}
                                    color="orange"
                                    size="sm"
                                />
                            </div>
                        )}
                        {dataFollowersAndFollowing?.map((itemsFallowAndFollowing: any) => (
                            <div
                                className="bg-gray-300 p-2 rounded-md flex items-center justify-between"
                                key={itemsFallowAndFollowing.id}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-950 shadow-2xl rounded-full p-1">
                                        <div className="h-full w-full rounded-full overflow-hidden">
                                            <img
                                                src={itemsFallowAndFollowing.avatar_url}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <span className=" font-semibold">{itemsFallowAndFollowing.login}</span>
                                </div>

                                {/* <div className="flex gap-x-2 items-center">
                                    <RiContactsFill />
                                    <div className="flex gap-x-2 text-sm items-center">
                                        <div
                                            onClick={() => {
                                                setInputSearch(itemsFallowAndFollowing.login);
                                                setOpenModal({ ...openModal, type: 'followers' });
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <span className="font-medium">followers</span> .
                                        </div>
                                        <div
                                            onClick={() => {
                                                setInputSearch(itemsFallowAndFollowing.login);
                                                setOpenModal({ ...openModal, type: 'following' });
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <span className="font-medium">following</span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        ))}
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

                            <a href={data.html_url} target="_blank" className=" truncate" title={data.html_url}>
                                <div className="bg-gray-300 p-2 rounded-md text-center text-lg font-semibold">
                                    Go to Github
                                </div>
                            </a>
                            <div className="flex flex-col gap-1">
                                <span>{data.bio}</span>
                                <div className="flex gap-x-1 font-semibold">
                                    <AiOutlineUser className="text-xl" />
                                    <div
                                        className="flex  cursor-pointer gap-x-1"
                                        onClick={() => setOpenModal({ open: true, type: 'followers' })}
                                    >
                                        <span>{data.followers}</span>
                                        <span className="">followers</span>
                                    </div>
                                    <span>.</span>
                                    <div
                                        className="flex  cursor-pointer gap-x-1"
                                        onClick={() => setOpenModal({ open: true, type: 'following' })}
                                    >
                                        <span>{data.following}</span>
                                        <span className="">following</span>
                                    </div>
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
                                                {items.value.includes('https') ? (
                                                    <Link
                                                        href={items.value}
                                                        className="text-sm font-medium truncate"
                                                        title={items.value}
                                                    >
                                                        {items.value}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm font-medium truncate" title={items.value}>
                                                        {items.value}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                        {organHandler()}
                    </div>
                    <div className="col-span-1 lg:col-span-3 overflow-auto bg-slate-200 p-1 rounded-md  ">
                        {repoHandler()}
                    </div>
                </div>
                <Modal
                    opened={openModal.open}
                    onClose={() => {
                        setOpenModal({ open: false, type: '' });
                        setPageDataFollowFollowing(1);
                    }}
                    title={
                        <span className="font-semibold">
                            {openModal.type} (<span className="text-sm  ">{data[openModal.type]}</span>)
                        </span>
                    }
                    centered
                >
                    <div className="  p-2 bg-slate-100 rounded-md">{followersAndFollowingHandler()}</div>
                </Modal>
            </Wrapper>
        );
    }
};

export default Github;
