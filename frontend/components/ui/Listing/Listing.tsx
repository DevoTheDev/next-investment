"use client";
import { default_NewsSentiments, top30_default } from "@/constants";
import formatHeader, { capitalize } from "@/lib/utils";
import { MappedDetails, Config } from "@/constants/types";
import * as React from "react";

export type ListingConfig<T> = Config<T> & { 
    tableRow?: React.HTMLAttributes<HTMLDivElement>;
    tableDetail?: React.HTMLAttributes<HTMLDivElement>;
};

export type ListingProps<T extends object> = MappedDetails<T, "_", Config<T>> & {
    data: T;
    type: "div" | "table";
    config?: ListingConfig<T>;
    hideKeys?: boolean;
    hideValues?: boolean;
};

const Listing = <T extends object>(props: ListingProps<T>) => {
    const { data, type, config, hideKeys, hideValues, ...targeting } = props;

    // Check if data is null, undefined, or an empty array and return null to prevent rendering
    if (data == null || (Array.isArray(data) && data.length === 0)) {
        return null;
    }

    const handleConfig = <K extends keyof T>(key: K) => {
        const targetedConfig = targeting[`_${key}`] as ListingConfig<T> | undefined;

        return {
            tableRow: { ...config?.tableRow, ...targetedConfig?.tableRow },
            tableDetail: { ...config?.tableDetail, ...targetedConfig?.tableDetail },
            keyValueContainer: { ...config?.keyValueContainer, ...targetedConfig?.keyValueContainer },
            keyRef: { ...config?.keyRef, ...targetedConfig?.keyRef },
            value: { ...config?.value, ...targetedConfig?.value },
            visible: targetedConfig?.visible ?? config?.visible ?? true,
        };
    };

    const renderNestedObject = (value: any) => {
        return <Listing data={value} type={type} config={config} hideKeys={hideKeys} hideValues={hideValues} {...targeting} />;
    };

    const divRender = () =>
        // Ensure `data` is not null or undefined
        Object.entries(data || {}).map(([key, value], index) => {
            const config = handleConfig(key as keyof T);

            if (!config.visible) {
                return null;
            }

            return (
                <div key={index} {...config.keyValueContainer}>
                    {!hideKeys && <div {...config.keyRef}>{formatHeader(key)}</div>}
                    {!hideValues && (
                        typeof value === "object" ? renderNestedObject(value) : <div {...config.value}>{String(value)}</div>
                    )}
                </div>
            );
        });

    const tableRowRender = () => (
        <tr {...config?.tableRow}>
            {Object.entries(data || {}).map(([key, value], index) => {
                const config = handleConfig(key as keyof T);

                if (!config.visible) {
                    return null;
                }

                return (
                    <td key={index} {...config.tableDetail}>
                        {!hideKeys && <div {...config.keyRef}>{formatHeader(key)}</div>}
                        {!hideValues && (
                            typeof value === "object" ? renderNestedObject(value) : <div {...config.value}>{String(value)}</div>
                        )}
                    </td>
                );
            })}
        </tr>
    );

    const render = () => {
        if (typeof data === "object" && data !== null) {
            return type === "table" 
            ? tableRowRender()
            : <div {...config?.container}>{divRender()}</div>;
        } else {
            return <div {...config?.value}>{String(data)}</div>;
        }
    };

    return <>{render()}</>;
};

export default Listing;
