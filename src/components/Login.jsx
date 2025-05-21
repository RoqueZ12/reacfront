// src/components/Login.jsx
import { GoogleButton } from "./GoogleBtn";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <GoogleButton />
    </div>
  );
};

export {Login}
