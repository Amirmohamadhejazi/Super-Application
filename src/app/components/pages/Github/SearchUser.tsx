/* eslint-disable @next/next/no-img-element */
'use client';
import { githubApiGetUser } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';
import Wrapper from './components/Wrapper';
import { AiOutlineUser } from 'react-icons/ai';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Error, Loading, NoData } from '../..';
import { IoLocationOutline } from 'react-icons/io5';
import { BsLink45Deg } from 'react-icons/bs';
import { TbBuildingCommunity } from 'react-icons/tb';
import { RiTwitterXLine } from 'react-icons/ri';
import Link from 'next/link';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import { OrgansUser, SearchRepoUser, UserFollowersAndFollowing } from '.';
import { NumberParam, useQueryParam } from 'use-query-params';
import { useSearchParams } from 'next/navigation';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { removeDuplicateObjects } from '../../helper';

const SearchUser = ({ searchSubmit, formRef }: any) => {
    const searchParams = useSearchParams();
    const searchQueryParams = searchParams.get('search');
    const [favorite, setFavorite] = useState<any[]>(JSON.parse(localStorage.getItem('DataFavoriteUser') || '[]'));
    // const [lastSearch, setLastSearch] = useState<any[]>(JSON.parse(localStorage.getItem('lastSearchUser') || '[]'));

    const [, setQuery] = useQueryParam('pageFollowersAndFollowing', NumberParam);
    const [modalAvatar, setModalAvatar] = useState<{ open: boolean; data: { avatar: string; name: string } }>({
        open: false,
        data: { avatar: '', name: '' }
    });
    const [OpenModal, setOpenModal] = useState<{
        open: boolean;
        type: string;
    }>({
        open: false,
        type: ''
    });
    // -------------------------------------------------------------------- searchUser
    // search first
    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data
    }: { isLoading: boolean; isError: boolean; error: any; isSuccess: boolean; data: any } = useQuery({
        queryKey: ['searchUserQuery', { searchQueryParams }],
        queryFn: () => searchQueryParams && githubApiGetUser(searchQueryParams),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

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
        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <div className="w-full flex items-center justify-center">
                    <Error text={error.response.data.message} />
                </div>
            </Wrapper>
        );
    }

    if (isSuccess) {
        let lastSearch = removeDuplicateObjects(JSON.parse(localStorage.getItem('lastSearchUser') || '[]'));
        const ToggleFavoriteHandler = (dataFavorite: any) => {
            if (favorite.find((itemsF) => itemsF.id === dataFavorite.id)) {
                const NewDataDeleted: any = favorite.filter((itemsF) => itemsF.id !== dataFavorite.id);
                localStorage.setItem('DataFavoriteUser', JSON.stringify(NewDataDeleted));
                setFavorite(NewDataDeleted);
            } else {
                const NewDataAdded: any = [...favorite, dataFavorite];
                localStorage.setItem('DataFavoriteUser', JSON.stringify(NewDataAdded));
                setFavorite(NewDataAdded);
            }
        };
        if (!data) {
            return (
                <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full gap-5 flex flex-col items-start">
                            <span className="text-xl font-semibold">favorite:</span>
                            {favorite.length > 0 ? (
                                <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {favorite.map((itemsFavorite: any) => (
                                        <div
                                            className="flex flex-col gap-1 p-1 hover:scale-[102%] bg-slate-300 z-30 shadow-md hover:bg-slate-800 text-black hover:text-white transition-all duration-100 rounded-md"
                                            key={itemsFavorite.id}
                                        >
                                            <div className="col-span-2 flex justify-between items-center gap-x-2 truncate">
                                                <div className="flex gap-2">
                                                    <div className="w-7 h-w-7 bg-slate-600 rounded-full p-0.5">
                                                        <div className="h-full w-full brightness-75 rounded-full overflow-hidden">
                                                            <img
                                                                src={itemsFavorite.avatar_url}
                                                                className="w-full h-full object-cover"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={`/github?search=${itemsFavorite.login}`}
                                                        className=" truncate"
                                                    >
                                                        <span className="text-sm font-medium ">
                                                            {itemsFavorite.login}{' '}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() => ToggleFavoriteHandler(itemsFavorite)}
                                                >
                                                    <FaHeart className="text-xl text-red-600" />
                                                </div>
                                            </div>
                                            <div className="flex gap-x-1 text-sm font-semibold">
                                                <AiOutlineUser className="text-lg" />
                                                <div className="flex  cursor-pointer gap-x-1">
                                                    <span>{itemsFavorite.followers}</span>
                                                    <span className="">followers</span>
                                                </div>
                                                <span>.</span>
                                                <div className="flex  cursor-pointer gap-x-1">
                                                    <span>{itemsFavorite.following}</span>
                                                    <span className="">following</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold">
                                                Creation date:{' '}
                                                {format(new Date(itemsFavorite.created_at), 'yyyy-MM-dd')}
                                            </span>
                                            <span className="text-xs font-semibold">
                                                last Update: {format(new Date(itemsFavorite.updated_at), 'yyyy-MM-dd')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex items-center justify-center">
                                    <NoData text="you are dont have favorite!" />
                                </div>
                            )}
                        </div>
                        <div className="w-full gap-5 flex flex-col items-start">
                            <span className="text-xl font-semibold">last Search:</span>
                            {lastSearch.length > 0 ? (
                                <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {lastSearch.map((itemsFavorite: any) => (
                                        <div
                                            className="flex flex-col gap-1 p-1 hover:scale-[102%] bg-slate-300 z-30 shadow-md hover:bg-slate-800 text-black hover:text-white transition-all duration-100 rounded-md"
                                            key={itemsFavorite.id}
                                        >
                                            <div className="col-span-2 flex justify-between items-center gap-x-2 truncate">
                                                <div className="flex gap-2">
                                                    <div className="w-7 h-w-7 bg-slate-600 rounded-full p-0.5">
                                                        <div className="h-full w-full brightness-75 rounded-full overflow-hidden">
                                                            <img
                                                                src={itemsFavorite.avatar_url}
                                                                className="w-full h-full object-cover"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={`/github?search=${itemsFavorite.login}`}
                                                        className=" truncate"
                                                    >
                                                        <span className="text-sm font-medium ">
                                                            {itemsFavorite.login}{' '}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="flex gap-x-1 text-sm font-semibold">
                                                <AiOutlineUser className="text-lg" />
                                                <div className="flex  cursor-pointer gap-x-1">
                                                    <span>{itemsFavorite.followers}</span>
                                                    <span className="">followers</span>
                                                </div>
                                                <span>.</span>
                                                <div className="flex  cursor-pointer gap-x-1">
                                                    <span>{itemsFavorite.following}</span>
                                                    <span className="">following</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold">
                                                Creation date:{' '}
                                                {format(new Date(itemsFavorite.created_at), 'yyyy-MM-dd')}
                                            </span>
                                            <span className="text-xs font-semibold">
                                                last Update: {format(new Date(itemsFavorite.updated_at), 'yyyy-MM-dd')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex items-center justify-center">
                                    <NoData text="you are dont Search any user!" />
                                </div>
                            )}
                        </div>
                    </div>
                </Wrapper>
            );
        }
        if (data) {
            localStorage.setItem('lastSearchUser', JSON.stringify([...lastSearch, data]));
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

        return (
            <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2 ">
                    <div className="col-span-1 lg:col-span-1 p-1">
                        <div className="flex flex-col gap-y-2">
                            <div
                                className="w-40 h-40 bg-blue-950 shadow-2xl rounded-full p-1 cursor-pointer"
                                onClick={() =>
                                    setModalAvatar({ open: true, data: { avatar: data.avatar_url, name: data.login } })
                                }
                            >
                                <div className="h-full w-full rounded-full overflow-hidden">
                                    <img src={data.avatar_url} className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold">{data.name}</span>

                                    <span className="text-sm font-light">{data.login}</span>
                                </div>
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => ToggleFavoriteHandler(data)}
                                >
                                    {favorite.find((itemsF) => itemsF.login === data.login) ? (
                                        <FaHeart className="text-xl text-red-600" />
                                    ) : (
                                        <FaRegHeart className="text-xl" />
                                    )}
                                </div>
                            </div>
                            <a
                                href={data.html_url}
                                target="_blank"
                                className="w-full sm:w-1/2 lg:w-full truncate"
                                title={data.html_url}
                            >
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
                        {/* {organHandler()} */}
                        <OrgansUser inputSearch={searchQueryParams} />
                    </div>
                    <div className="col-span-1 lg:col-span-3 overflow-auto bg-slate-200 p-1 rounded-md  ">
                        <SearchRepoUser inputSearch={searchQueryParams} dataUser={data} />
                    </div>
                </div>
                <Modal
                    opened={OpenModal.open}
                    onClose={() => {
                        setOpenModal({ open: false, type: OpenModal.type });
                        setQuery(undefined);
                    }}
                    title={
                        <span className="font-semibold">
                            {OpenModal.type} (<span className="text-sm  ">{data[OpenModal.type]}</span>)
                        </span>
                    }
                    centered
                >
                    <div className="  p-2 bg-slate-100 rounded-md">
                        <UserFollowersAndFollowing
                            openModal={OpenModal}
                            setModalAvatar={setModalAvatar}
                            setOpenModal={setOpenModal}
                            userDetailSocial={{ followers: data.followers, following: data.following }}
                            inputSearch={searchQueryParams}
                        />
                    </div>
                </Modal>

                <Modal
                    opened={modalAvatar.open}
                    onClose={() => setModalAvatar({ open: false, data: modalAvatar.data })}
                    withCloseButton={false}
                    centered
                >
                    <div className="flex flex-col">
                        <div className="bg-slate-50  rounded-md">
                            <img
                                src={modalAvatar.data.avatar}
                                className="object-cover rounded-md w-full h-full"
                                alt={modalAvatar.data.name}
                            />
                        </div>
                        <span className="text-sm text-center font-semibold mt-1 text-gray-600">
                            {modalAvatar.data.name}
                        </span>
                    </div>
                </Modal>
            </Wrapper>
        );
    }
};

export default SearchUser;
