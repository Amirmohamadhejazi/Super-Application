'use client';

import { useRef, useState } from 'react';
import { SearchUser } from '../components/pages/Github';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

const GithubTemplate = () => {
    const formRef = useRef<any>(null);
    const [, setQuery] = useQueryParams({
        pageRepository: NumberParam,
        reposType: StringParam,
        search: StringParam
    });
    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setQuery({ search: dataInput, reposType: undefined, pageRepository: undefined });
        }
    };
    return <SearchUser searchSubmit={searchSubmit} formRef={formRef} />;
};
export default GithubTemplate;
