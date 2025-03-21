import { useState } from "react"; // Import useState
import profileIcon from "../assets/images/AuthenticationIcons/profile-icon.png";
import { useForm, SubmitHandler } from "react-hook-form";
import userIcon from "../assets/images/AuthenticationIcons/user-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/modals/typeDefinitions";
import { ThreeDot } from "react-loading-indicators";
import { loginSchema } from "@/modals/schema";
import ForgotPassword from "../shared/forgotPassword";

type Inputs = z.infer<typeof loginSchema>;

interface loginProps {
  onSubmit: (data: LoginSchema) => void;
  loading: boolean;
  setIsLogin: (isBool: boolean) => void;
}

const Login: React.FC<loginProps> = ({ onSubmit, loading, setIsLogin }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const loginSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="self-center flex flex-col justify-center items-center gap-5 w-full">
      {showForgotPassword ? (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              src={profileIcon}
              alt="Profile Icon"
              className="w-10 self-center my-4"
            />
            <h1 className="text-2xl text-orange-primary-1">Login</h1>
          </div>
          <div className="w-3/4 md:w-3/5 lg:w-[400px] flex items-center justify-center mt-5">
            <form
              onSubmit={handleSubmit(loginSubmit)}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex justify-between items-center bg-[#AAE9E3] rounded-full w-full pr-4 h-12 text-orange-primary-1">
                <input
                  {...register("email")}
                  className="px-5 border-none outline-none bg-transparent placeholder-gray-600 text-gray-600 w-full"
                  placeholder="Email"
                />
                <img src={userIcon} alt="Icon" className="w-5 mr-4" />
              </div>
              {errors.email && (
                <div className="text-red-500 text-[10px] ml-3">
                  *{errors.email.message}
                </div>
              )}

              <div className="flex justify-between items-center bg-[#AAE9E3] rounded-full w-full pr-4 h-12 text-orange-primary-1">
                <input
                  {...register("password")}
                  type="password"
                  className="px-5 border-none outline-none bg-transparent placeholder-gray-600 text-gray-600 w-full"
                  placeholder="Password"
                />
                <img src={passwordIcon} alt="Icon" className="w-5" />
              </div>
              {errors.password && (
                <div className="text-red-500 text-[10px] ml-3">
                  *{errors.password.message}
                </div>
              )}

              <div className="text-center mt-6 mb-2">
                <Button
                  type="submit"
                  className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c] cursor-pointer tracking-wider text-base hover:shadow-lg hover:scale-105 "
                >
                  {loading ? (
                    <ThreeDot easing="ease-in" size="small" color="#fff" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <button
                type="button"
                className="text-[#FFB941] mb-4 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forget password
              </button>
              <div className="flex justify-center">
                <p className="text-sm text-[#ff9f1c]">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold hover:underline cursor-pointer"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
