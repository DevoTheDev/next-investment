"use client";
import React from 'react';
import { useSelection } from '@/components/contexts/SelectionContext';
import formatHeader from '@/lib/utils';

type StockListProps<T> = {
    stocks: T[];
};

const StockList = <T extends object>({ stocks }: StockListProps<T>) => {
    const { setSelectedItem, selectionDialog, selectedItem } = useSelection();

    // Handle empty data gracefully
    if (stocks.length === 0) {
        return <div className="text-customCyan">No data available.</div>;
    }

    // Extract headers dynamically from the first stock object
    const headers = Object.keys(stocks[0]);

    return (
        <div className="w-full">
            <table className="w-full table-auto border-collapse border border-gray-800">
                <thead>
                    <tr className="bg-gray-600 text-white">
                        {headers.map((key) => (
                            <th key={key} className="border border-gray-500 px-4 py-2 text-left">
                                {formatHeader(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, rowIndex) => (
                        <tr 
                        key={rowIndex} 
                        className={`${rowIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                         hover:bg-gray-900 cursor-pointer text-customCyan`}
                        onClick={() => setSelectedItem(stock)}
                        >
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="border border-gray-500 px-4 py-2">
                                    {stock[header as keyof T] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;
