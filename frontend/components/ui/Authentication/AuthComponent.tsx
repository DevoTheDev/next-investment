"use client";
import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/components/contexts/UserContext";

type AuthComponentProps = {
  type: "register" | "login";
  values?: {
    title?: string;
    unPlaceholder?: string;
    pwPlaceholder?: string;
    buttonText?: string;
  };
};

const AuthComponent = ({ type, values }: AuthComponentProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {register, login} = useAuthContext();
  const router = useRouter();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    switch (type) {
      case "login":
        return login(username, password);
      case "register":
        return register(username, password); // Pass new fields for registration
    }
  };

  const handleNewAccount = () => {
    router.push("/auth/register");
  };

  const handleAsGuest = () => {
    router.push("/home");
  };

  return (
    <div
      className={`flex flex-col justify-center items-center max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700`}
    >
      <div className={`text-center text-3xl font-semibold text-cyan-300 mb-6`}>
        {values?.title || (type === "login" ? "Login" : "Register")}
      </div>
      <div className="space-y-4 w-full">
        <input
          onChange={handleUsername}
          placeholder="Enter Username"
          className={`bg-gray-900 text-white w-full p-4 rounded-xl text-lg placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <input
          onChange={handlePassword}
          placeholder="Enter Password"
          className={`bg-gray-900 text-white w-full p-4 rounded-xl text-lg placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          type="password"
        />
        <button
          className={`bg-cyan-500 text-white hover:bg-cyan-600 w-full p-4 rounded-xl text-xl font-bold transition duration-300 ease-in-out cursor-pointer`}
          onClick={handleSubmit}
        >
          {"Submit"}
        </button>
        {type === "login" && (
          <div
            className={`text-center text-cyan-400 hover:text-cyan-500 cursor-pointer`}
            onClick={handleNewAccount}
          >
            Create a New Account
          </div>
        )}
        <div
          className={`text-center text-cyan-400 hover:text-cyan-500 cursor-pointer`}
          onClick={handleAsGuest}
        >
          Continue As Guest
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
