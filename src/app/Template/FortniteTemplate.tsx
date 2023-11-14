'use client';
import { Tabs } from '@mantine/core';
import { fortLogo } from '@public/picture';
import Image from 'next/image';
import { AllCosmetics, NewCosmetics, News, Shop, SearchCosmetics, FortniteStats } from '../components/Fortnite';
import { useSearchParams } from 'next/navigation';
import { StringParam, useQueryParam } from 'use-query-params';
import { Error } from '../components';

type TTab = string | null;
const FortniteTemplate = () => {
    const searchParams = useSearchParams();
    const currentTab: TTab = searchParams.get('tab') || 'shop';
    const [, setQuery] = useQueryParam('tab', StringParam);

    const tabs = ['shop', 'newcosmetics', 'allcosmetics', 'news', 'searchcosmetics', 'fortnitestats'];

    return (
        <div className="container p-2 mx-auto h-screen  ">
            <div className="flex justify-center  ">
                <Image src={fortLogo.src} width={200} height={1} alt="" />
            </div>
            {tabs.includes(currentTab) ? (
                <>
                    <div className="flex justify-start">
                        <Tabs defaultValue={currentTab}>
                            <Tabs.List>
                                {tabs.map((itemsTab: string, index: number) => (
                                    <Tabs.Tab
                                        key={index}
                                        value={itemsTab}
                                        onClick={() => setQuery(itemsTab)}
                                        disabled={currentTab === itemsTab}
                                    >
                                        {itemsTab}
                                    </Tabs.Tab>
                                ))}
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <div className="flex flex-col gap-y-12 mt-8">
                        {currentTab === tabs[0] && <Shop />}
                        {currentTab === tabs[1] && <NewCosmetics />}
                        {currentTab === tabs[2] && <AllCosmetics />}
                        {currentTab === tabs[3] && <News />}
                        {currentTab === tabs[4] && <SearchCosmetics />}
                        {currentTab === tabs[5] && <FortniteStats />}
                    </div>
                </>
            ) : (
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            )}
        </div>
    );
};

export default FortniteTemplate;
