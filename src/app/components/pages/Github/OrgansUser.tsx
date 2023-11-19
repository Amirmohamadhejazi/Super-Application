/* eslint-disable @next/next/no-img-element */
'use client';
import { githubApiGetUserOrgan } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';

const OrgansUser = ({ inputSearch }: { inputSearch: string | null }) => {
    // search org first
    const { isSuccess, data } = useQuery({
        queryKey: ['searchUserOrganQuery', { inputSearch }],
        queryFn: () => inputSearch && githubApiGetUserOrgan(inputSearch),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });
    if (isSuccess && data.length > 0) {
        return (
            <div className="flex flex-col mb-3">
                <hr className="my-2" />
                <span className="font-semibold text-sm mb-3">izations</span>
                <div className="flex gap-2 flex-wrap">
                    {data.map((items: any) => (
                        <div className="w-11 h-11 bg-gray-200 rounded-md p-1" key={items.id} title={items.login}>
                            <img src={items.avatar_url} className="object-cover rounded-md" alt={items.login} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default OrgansUser;
