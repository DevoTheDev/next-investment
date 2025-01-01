"use client";
import { useUserContext } from "@/components/contexts/UserContext";
import { DropdownList, DropdownItem } from "@/components/ui/DropdownList/DropdownList";
import React from "react";

export const SettingsBody: React.FC = () => {
  const { user, userForm, updateUser } = useUserContext();

  const saveChanges = () => {
    if(user) {
      updateUser(user)
    }
  }

  const dropdownItems: DropdownItem[] = [
    {
      label: (
        <div className="flex items-center space-x-2 font-bold">
          <span role="img" aria-label="User">
            👤
          </span>
          <span className="font-medium">User Details</span>
        </div>
      ),
      component: (
        <div>
          {userForm(
            { className: "grid grid-cols-3 gap-4" },
            { className: "bg-gray-700 w-full p-2 rounded-xl text-white border-black border-2" }
          )}
          <div className="flex w-full justify-end " >
          <button 
          onClick={saveChanges}
          className="bg-gray-600 text-white hover:text-customCyan hover:bg-gray-700 px-3 py-2 rounded-xl">
            Save Changes
          </button>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Preferences">
            📋
          </span>
          <span className="font-medium">Preferences</span>
        </div>
      ),
      component: (
        <div>
          <p>Preferences content goes here!</p>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Settings">
            ⚙️
          </span>
          <span className="font-medium">Settings</span>
        </div>
      ),
      component: (
        <div>
          <p>Settings content goes here!</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto w-1/2 bg-gray-950 p-6 h-full">
      <DropdownList 
      items={dropdownItems}
      containers={{
        labelContainer: "text-customCyan flex w-full p-5 rounded-xl",
        componentContainer: "bg-gray-800 rounded-b-xl p-4 text-customCyan",
        dropDownContainer: "bg-gray-900 rounded-xl hover:bg-gray-700 border-2 border-gray-600",
      }}
      />
    </div>
  );
};
