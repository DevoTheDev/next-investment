"use client";
import * as React from 'react';
import { Stock } from '@/constants';

export interface Investment extends Stock {
    purchasePrice: number
}

interface InvestorContextType {
    investments: any
}

const InvestorContext = React.createContext<InvestorContextType | undefined>(undefined);

export const useInvestors = (): InvestorContextType => {
    const context = React.useContext(InvestorContext);
    if (!context) {
        throw new Error('useInvestor must be used within an InvestorProvider');
    }
    return context;
};

interface InvestorProviderProps {
    children: React.ReactNode;
}

export const InvestorProvider = ({ children }: InvestorProviderProps) => {
    const [investments, setInvestments] = React.useState<Investment[]>([]);
    const [wallet, setWallet] = React.useState<number>(0);


    
    return (
        <InvestorContext.Provider value={{ investments }}>
            {children}
        </InvestorContext.Provider>
    );
};