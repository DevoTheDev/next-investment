"use client"
import React from 'react'
import Listing, { ListingConfig, ListingProps } from '../Listing/Listing';
import { MappedDetails, Config } from '@/constants/types';

type ListProps<T extends object> = {
    data: T[];
    type: "div" | "table";
    config?: ListingConfig<T> & {
        list?: React.HTMLAttributes<HTMLDivElement>; 
        tableHead?: React.HTMLAttributes<HTMLDivElement>;
    };
    hideKeys?: boolean;
    hideValues?: boolean;
} & MappedDetails<T, "_", Config<T>>;

const List = <T extends object>(props: ListProps<T>) => {
    const { data, type, config, hideKeys, hideValues, ...targeting } = props;

    if (type === "table") {
        return (
            <table {...config?.list}>
                <thead {...config?.tableHead}>
                    {data.map((item, index) => (
                        <Listing
                            key={index}
                            data={item}
                            type="table"
                            config={config}
                            hideKeys={hideKeys}
                            hideValues={hideValues}
                            {...targeting}
                        />
                    ))}
                </thead>
            </table>
        );
    }

    return (
        <div {...config?.list}>
            {data.map((item, index) => (
                <Listing
                    key={index}
                    data={item}
                    type="div"
                    config={config}
                    hideKeys={hideKeys}
                    hideValues={hideValues}
                    {...targeting}
                />
            ))}
        </div>
    );
};

export default List;