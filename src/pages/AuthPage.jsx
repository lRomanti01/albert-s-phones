import React, { useState } from "react";
import SignInModal from "../components/auth/SignInModal";
import SignUpModal from "../components/auth/SignUpModal";

import { IoIosPhonePortrait } from "react-icons/io";

export const AuthPage = () => {
  const [auth, setAuth] = useState(true);

  const changeAuth = () => {
    setAuth(!auth);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-center items-center bg-gradient-to-br  from-blue-800 via-bue-500 to-blue-300">
      <div
        className={`flex flex-col justify-center items-center mb-4 gap-2 px-5`}
      >
        <IoIosPhonePortrait className="text-8xl text-white" />
        <h1 className="text-4xl font-bold text-center text-white">
          Albert's Phones
        </h1>
        <span className="text-center text-sm text-white">
          Bienvenido a la mejor tienda de celulares del mundo
        </span>
      </div>
      
      {auth ? (
        <SignInModal onChange={changeAuth} />
      ) : (
        <SignUpModal onChange={changeAuth} />
      )}
    </div>
  );
}
