"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';


interface ExperimentContextType {
    state: any
}

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined);

export const useExperiments = (): ExperimentContextType => {
    const context = useContext(ExperimentContext);
    if (!context) {
        throw new Error('useExperiment must be used within an ExperimentProvider');
    }
    return context;
};

interface ExperimentProviderProps {
    children: ReactNode;
}

export const ExperimentProvider = ({ children }: ExperimentProviderProps) => {
    const [state, setState] = useState<any>();

    return (
        <ExperimentContext.Provider value={{ state }}>
            {children}
        </ExperimentContext.Provider>
    );
};
