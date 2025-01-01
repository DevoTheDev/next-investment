"use client";
import React from "react";
import { validateForUse } from "@/lib/utils";

type Market = {
    current_status: string;
    local_close: string;
    local_open: string;
    market_type: string;
    notes?: string;
    primary_exchanges: string;
    region: string;
};

type MarketStatusProps = {
    markets: Market[];
    layout?: "page" | "sidebar";
};

const MarketStatus: React.FC<MarketStatusProps> = ({ markets, layout = "page" }) => {
    // Sort markets: "open" statuses first
    const sortedMarkets = [...markets].sort((a, b) =>
        a.current_status === "open" && b.current_status !== "open" ? -1 : 1
    );

    const containerStyles =
        layout === "page"
            ? "space-y-4"
            : "flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-4rem)]"; // For sidebar layout

    return (
        <div className={containerStyles}>
            {sortedMarkets.map((market, index) => {
                const {
                    current_status,
                    local_close,
                    local_open,
                    market_type,
                    notes,
                    primary_exchanges,
                    region,
                } = validateForUse(market);

                return (
                    <div
                        key={index}
                        className={`md:flex md:items-center md:gap-4 md:p-4 rounded-lg shadow-lg border-l-4 grid grid-cols-2
                            ${
                                current_status === "open"
                                    ? "bg-gray-900 border-cyan-500"
                                    : "bg-gray-800 border-red-500"
                            }`}
                    >
                        <div className=" font-medium text-cyan-300 w-1/5">
                            🌍 {region}
                        </div>
                        <div
                            className={`text-sm font-semibold px-3 py-1 rounded-md w-max
                                ${
                                    current_status === "open"
                                        ? "bg-cyan-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}
                        >
                            {current_status!.toUpperCase()}
                        </div>
                        <div className=" text-gray-300 text-sm w-1/5">
                            🕒 {local_open} - {local_close}
                        </div>
                        <div className=" text-xs text-gray-400 w-1/5">
                            {market_type} | {primary_exchanges}
                        </div>
                        {notes && (
                            <div className="text-xs italic text-gray-500 w-1/5 text-wrap">
                                ✏️ {notes}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MarketStatus;

