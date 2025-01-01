"use client";
import NewsSentiment from '@/components/ui/NewsSentiment/NewsSentiment';
import StockList from '@/components/ui/StockList/StockList';
import { default_MarketStatus, default_NewsSentiments, top30_default } from '@/constants';
import { useSelection } from '@/components/contexts/SelectionContext';
import * as React from 'react';
import MarketStatus from '@/components/ui/MarketStatus/MarketStatus';

const MarketBody = (): React.JSX.Element => {

    const { selectionDialog } = useSelection();


    return (
        <>
    <div
        className="relative text-customCyan font-semibold text-4xl w-full text-center p-8 bg-black"
    >Market</div>
    <div className='flex justify-evenly h-lvh'>
        <div className='w-1/3 h-full overflow-y-auto'>
            <MarketStatus markets={default_MarketStatus.markets} />
        </div>
        <div className='w-1/3 h-full overflow-y-auto'>
            <StockList stocks={top30_default} />
        </div>
        <div className="w-1/3 h-full overflow-y-auto">
            <div className="gap-6">
                {default_NewsSentiments.feed.map((sent, i) => (
                    <NewsSentiment key={i} sentiment={sent} />
                ))}
            </div>
        </div>
    </div>
</>
    )

}

export default MarketBody