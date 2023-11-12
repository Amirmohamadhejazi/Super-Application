'use client';
import { Tabs } from '@mantine/core';
import { fortLogo } from '@public/picture';
import Image from 'next/image';
import React, { useState } from 'react';
import { AllCosmeticsTemplate, NewCosmeticsTemplate, ShopTemplate } from '../components/Fortnite';

const FortniteTemplate = () => {
    const [tab, setTab] = useState('shop');

    const tabs = ['shop', 'NewCosmetics', 'AllCosmetics'];

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
                {tab === 'shop' && <ShopTemplate />}
                {tab === 'NewCosmetics' && <NewCosmeticsTemplate />}
                {tab === 'AllCosmetics' && <AllCosmeticsTemplate />}
            </div>
        </div>
    );
};

export default FortniteTemplate;
