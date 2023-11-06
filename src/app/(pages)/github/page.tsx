'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Wrapper from './components/Wrapper';
import { Error, Loading, NoData } from '@/app/components';
import { toast } from 'react-toastify';
import { RiTwitterXLine } from 'react-icons/ri';
import { BsLink45Deg } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { TbBuildingCommunity } from 'react-icons/tb';
import { format } from 'date-fns';
import calculator from './components/utils/calculator';
import { AiOutlineStar, AiOutlineUser } from 'react-icons/ai';
import { Button, CopyButton, Pagination, Modal, Select } from '@mantine/core';
import Link from 'next/link';
import { Tooltip } from '@mui/material';
import {
    githubApiGetUser,
    githubApiGetUserFollowersAndFollowing,
    githubApiGetUserOrgan,
    githubApiGetUserRepos
} from '@/core/service/api';
import { tikeImg } from '@public/picture';
import { VscRepoForked } from 'react-icons/vsc';

const Github = () => {
    const formRef = useRef<any>(null);
    const [openModal, setOpenModal] = useState({ open: false, type: '' });
    const [test, setTest] = useState({ data: [1, 2, 3, 4, 5], name: 'A' });
    const [modalAvatar, setModalAvatar] = useState<{ open: boolean; data: { avatar: string; name: string } }>({
        open: false,
        data: { avatar: '', name: '' }
    });
    const [inputSearch, setInputSearch] = useState<string>('');
    const [pageDataRepos, setPageDataRepos] = useState<number>(1);
    const [sortReposType, setSortReposType] = useState<string>('created');
    const [pageDataFollowFollowing, setPageDataFollowFollowing] = useState<number>(1);

    // search first
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['searchUserQuery', { inputSearch }],

        queryFn: () => inputSearch && githubApiGetUser(inputSearch),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    // search org first
    const { isSuccess: isSuccessOrgan, data: dataOrgan } = useQuery({
        queryKey: ['searchUserOrganQuery', { inputSearch }],
        queryFn: () => inputSearch && githubApiGetUserOrgan(inputSearch),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    // search Repository User
    const {
        isLoading: isLoadingReposUser,
        isError: isErrorReposUser,
        error: errorReposUser,
        isSuccess: isSuccessReposUser,
        data: dataReposUser
    } = useQuery({
        queryKey: ['searchRepoUser', { inputSearch, pageDataRepos, sortReposType }],
        queryFn: () =>
            inputSearch &&
            githubApiGetUserRepos({
                inputSearch: inputSearch,
                pageDataRepos: pageDataRepos,
                sortReposType: sortReposType
            }),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
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
            }),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setInputSearch(dataInput);
            setPageDataRepos(1);
            setSortReposType('created');
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

                if (convertRepData.length === 0) {
                    return (
                        <div className="w-full h-full flex items-center justify-center">
                            <NoData text="This user dont have Repository!" />
                        </div>
                    );
                }
                return (
                    <div className="flex flex-col gap-y-5 m-1">
                        <div className="flex gap-2 justify-between items-center flex-wrap">
                            <span className="text-lg font-semibold">
                                Repositories: (<span className="text-sm">{data?.public_repos}</span>)
                            </span>
                            <div className="flex items-center flex-wrap-reverse gap-2">
                                <Select
                                    size="sm"
                                    placeholder="Sort by:"
                                    data={['created', 'updated', 'pushed', 'full_name']}
                                    onChange={(e: any) => {
                                        setSortReposType(e);
                                        setPageDataRepos(1);
                                    }}
                                    value={sortReposType}
                                    searchable
                                />
                                {page > 1 && (
                                    <div className="flex justify-center">
                                        <Pagination
                                            total={page}
                                            value={pageDataRepos}
                                            onChange={setPageDataRepos}
                                            color="orange"
                                            size="sm"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {convertRepData.map((itemsRepo) => (
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
                if (!dataFollowersAndFollowing || dataFollowersAndFollowing?.length === 0) {
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
                                    <div
                                        className="w-10 h-10 bg-blue-950 shadow-2xl rounded-full p-1  cursor-pointer "
                                        onClick={() =>
                                            setModalAvatar({
                                                open: true,
                                                data: {
                                                    avatar: itemsFallowAndFollowing.avatar_url,
                                                    name: itemsFallowAndFollowing.login
                                                }
                                            })
                                        }
                                    >
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
                            <div
                                className="w-40 h-40 bg-blue-950 shadow-2xl rounded-full p-1 cursor-pointer"
                                onClick={() =>
                                    setModalAvatar({ open: true, data: { avatar: data.avatar_url, name: data.name } })
                                }
                            >
                                <div className="h-full w-full rounded-full overflow-hidden">
                                    <img src={data.avatar_url} className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">{data.name}</span>
                                <span className="text-sm font-light">{data.login}</span>
                            </div>

                            <a href={data.html_url} target="_blank" className="w-full sm:w-1/2 lg:w-full truncate" title={data.html_url}>
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
                        setOpenModal({ open: false, type: openModal.type });
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

                <Modal
                    opened={modalAvatar.open}
                    onClose={() => setModalAvatar({ open: false, data: modalAvatar.data })}
                    withCloseButton={false}
                    centered
                >
                    <div className="flex flex-col">
                        <img
                            src={modalAvatar.data.avatar}
                            className="object-cover rounded-md w-full h-full object-cover"
                            alt={modalAvatar.data.name}
                        />
                        <span className="text-sm text-center font-semibold mt-1 text-gray-600">
                            {modalAvatar.data.name}
                        </span>
                    </div>
                </Modal>
            </Wrapper>
        );
    }
};

export default Github;
