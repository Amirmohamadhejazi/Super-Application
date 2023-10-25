'use client';
import React from 'react';

type Product = {
    data: object;
};

function AmirHandler(data: object): void {}
AmirHandler({});
const Test = ({ data }: Product) => {
    return (
        <div>
            <div>
                <span>test cmpt</span>
            </div>
        </div>
    );
};

export default Test;
