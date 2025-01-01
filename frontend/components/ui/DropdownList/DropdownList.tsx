import React, { useState } from "react";

export interface DropdownItem {
  label: React.ReactNode;
  component: React.ReactNode;
}

interface DropdownListProps {
  items: DropdownItem[];
  containers?: {
    labelContainer?: string; // TailwindCSS class names as strings
    componentContainer?: string;
    dropDownContainer?: string;
  };
}

export const DropdownList: React.FC<DropdownListProps> = ({ items, containers }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={containers?.dropDownContainer}
        >
          <button
            onClick={() => toggleDropdown(index)}
            className={containers?.labelContainer}
          >
            <div className="flex-1">{item.label}</div>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div
              className={containers?.componentContainer}
            >
              {item.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};