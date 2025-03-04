import Login from "@/shared/Login";
import SignUp from "@/shared/Signup";
import { useState } from "react";
import Logo from "@/assets/images/Logo.png";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const Button = (buttonText: string, isbool: boolean) => (
    <button
      type="button"
      className="font-semibold hover:underline cursor-pointer"
      onClick={() => setIsLogin(isbool)}
    >
      {buttonText}
    </button>
  );

  return (
    <div className="w-full h-screen">
      <div className="relative w-full ">
        <img
          src={Logo}
          alt="TheraHub-logo"
          className="w-2/5 lg:w-1/5 absolute top-10 left-10 z-10 "
        />
      </div>
      <div className="flex md:mt-10 flex-col justify-center items-center w-full h-full">
        {isLogin ? <Login /> : <SignUp />}
        <p className="text-sm gap-3 text-[#ff9f1c]">
          {isLogin ? (
            <>Don't have an account {Button("Sign up", false)}</>
          ) : (
            <>Already have an account {Button("Login", true)}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default Authentication;
