import React from 'react';
import { Select } from '@mantine/core';

const Wrapper = ({
    children,
    dataSelect,
    setLocation,
    data
}: {
    children: React.ReactNode;
    dataSelect: any;
    setLocation: any;
    data: any;
}) => {
    return (
        <div className="container flex flex-col gap-y-2 items-center pt-5 mx-auto">
            <div className="w-full flex ">
                <div className="flex gap-x-3 justify-center items-center w-full">
                    <span>Right Now in</span>
                    <div className=" flex items-center ">
                        <Select
                            className="border-0"
                            placeholder="Pick value"
                            data={dataSelect}
                            clearable
                            onChange={(e: any) => setLocation(e)}
                            searchable
                        />
                    </div>
                    <span>its {data?.current?.condition?.text || '-------'}</span>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Wrapper;
