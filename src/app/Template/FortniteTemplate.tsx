'use client';
import { Tabs } from '@mantine/core';
import { fortLogo } from '@public/picture';
import Image from 'next/image';
import React, { useState } from 'react';
import { AllCosmetics, NewCosmetics, News, Shop, SearchCosmetics } from '../components/Fortnite';

const FortniteTemplate = () => {
    const [tab, setTab] = useState('News');

    const tabs = ['shop', 'NewCosmetics', 'AllCosmetics', 'News', 'SearchCosmetics'];

    return (
        <div className="container p-2 mx-auto h-screen  ">
            <div className="flex justify-center  ">
                <Image src={fortLogo.src} width={200} height={1} alt="" />
            </div>
            <div className="flex justify-start">
                <Tabs defaultValue={tab}>
                    <Tabs.List>
                        {tabs.map((itemsTab: string, index: number) => (
                            <Tabs.Tab
                                key={index}
                                value={itemsTab}
                                onClick={() => setTab(itemsTab)}
                                disabled={tab === itemsTab}
                            >
                                {itemsTab}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
            <div className="flex flex-col gap-y-12 mt-8">
                {tab === 'shop' && <Shop />}
                {tab === 'NewCosmetics' && <NewCosmetics />}
                {tab === 'AllCosmetics' && <AllCosmetics />}
                {tab === 'News' && <News />}
                {tab === 'SearchCosmetics' && <SearchCosmetics />}
            </div>
        </div>
    );
};

export default FortniteTemplate;
