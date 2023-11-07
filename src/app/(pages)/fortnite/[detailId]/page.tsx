'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fortniteApiCosmeticsSearchById } from '@/core/service/api';
import { toast } from 'react-toastify';
import { Error, Loading } from '@/app/components';

const DetailPage = ({ params }: { params: { detailId: string } }) => {
    const {
        isLoading: isLoadingDetail,
        isError: isErrorDetail,
        error: errorDetail,
        isSuccess: isSuccessDetail,
        data: dataDetail
    } = useQuery({
        queryKey: ['fortniteitemDetail'],
        queryFn: () => params.detailId && fortniteApiCosmeticsSearchById(params.detailId),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    if (isLoadingDetail) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (isErrorDetail) {
        toast.error(errorDetail?.message);
        return (
            <div className="w-full flex items-center justify-center">
                <Error />
            </div>
        );
    }

    if (isSuccessDetail) {
        console.log(dataDetail);

        return (
            <div className="flex flex-col ">
                <div>DetailPage {params.detailId}</div>;
            </div>
        );
    }
};

export default DetailPage;
