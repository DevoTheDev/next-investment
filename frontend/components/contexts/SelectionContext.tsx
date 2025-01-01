"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectionContextType<T> {
  selectedItem: T | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<T | undefined>>;
  selectionDialog: () => React.JSX.Element | null;
}

const SelectionContext = createContext<SelectionContextType<any> | undefined>(undefined);

interface SelectionProviderProps {
  children: ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);

  const selectionDialog = () => {
    const handleDialogClose = () => setSelectedItem(undefined);

    if (!selectedItem) {
      return null;
    }

    // Recursive renderer for objects and arrays
    const renderSelection = (obj: any): React.JSX.Element => {
      if (typeof obj !== 'object' || obj === null) {
        return <span>{String(obj)}</span>;
      }

      if (Array.isArray(obj)) {
        return (
          <ul className="list-disc pl-4">
            {obj.map((item, index) => (
              <li key={index}>{renderSelection(item)}</li>
            ))}
          </ul>
        );
      }

      return (
        <table className="table-auto border-collapse border border-gray-800 w-full text-left">
          <tbody>
            {Object.entries(obj).map(([key, value]) => (
              <tr key={key}>
                <th className="border border-gray-500 px-4 py-2 bg-gray-300">{key}</th>
                <td className="border border-gray-500 px-4 py-2">{renderSelection(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return (
      <div
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleDialogClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={handleDialogClose}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4">Selected Item</h2>
          {renderSelection(selectedItem)}
        </div>
      </div>
    );
  };

  const value = {
    selectedItem,
    setSelectedItem,
    selectionDialog,
  };

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};

export const useSelection = <T extends object>(): SelectionContextType<T> => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
