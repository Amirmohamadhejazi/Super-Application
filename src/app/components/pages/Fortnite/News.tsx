'use client';
import { Error, Loading } from '@/app/components';

import { fortniteApiBattleRoyalNews } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
type TNewsBattleRoyal = {
    title: string;
    body: string;
    image: string;
    id: string;
};
const News = () => {
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['fortniteBattleRoyalNews'],

        queryFn: () => fortniteApiBattleRoyalNews(),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

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
        const { br, stw } = data;
        const dataNewsBattleRoyal = br.motds.map((itemsNews: any) => {
            return {
                title: itemsNews.title,
                body: itemsNews.body,
                image: itemsNews.image,
                id: itemsNews.id
            };
        });

        return (
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-xl ">News BattleRoyal</span>
                    <hr />
                    <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-2">
                        {dataNewsBattleRoyal.map((itemsNews: TNewsBattleRoyal) => (
                            <div className="flex flex-col p-1 gap-2 bg-slate-200 rounded-md" key={itemsNews.id}>
                                <img src={itemsNews.image} className="w-full object-cover" alt="" />
                                <div className="flex flex-col gap-2 max-h-[120px] overflow-auto">
                                    <span className="font-semibold text-sm">{itemsNews.title}</span>
                                    <span className="font-light text-xs">{itemsNews.body}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="flex flex-col gap-2">
                    <span className="font-bold text-xl ">News Save the World</span>
                    <hr />
                    <div className="grid grid-cols-4 gap-2">
                        {dataNewsBattleRoyal.map((itemsNews: TNewsBattleRoyal) => (
                            <div className="flex flex-col p-1 gap-2 bg-slate-200 rounded-md" key={itemsNews.id}>
                                <img src={itemsNews.image} className="w-full object-cover" alt="" />
                                <div className="flex flex-col gap-2 text-sm max-h-[120px] overflow-auto">
                                    <span className="font-semibold">{itemsNews.title}</span>
                                    <span className="font-light">{itemsNews.body}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        );
    }
};

export default News;
