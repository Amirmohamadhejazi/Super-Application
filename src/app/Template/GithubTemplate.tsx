'use client';

import { useRef, useState } from 'react';
import { SearchUser } from '../components/pages/Github';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

const GithubTemplate = () => {
    const [inputSearch, setInputSearch] = useState<string>('');
    const formRef = useRef<any>(null);
    const [, setQuery] = useQueryParams({
        pageRepository: NumberParam,
        reposType: StringParam
    });
    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setInputSearch(dataInput);
            setQuery({ reposType: undefined, pageRepository: undefined });
        }
    };
    return (
        <>
            <SearchUser inputSearch={inputSearch} searchSubmit={searchSubmit} formRef={formRef} />
        </>
    );
};
export default GithubTemplate;