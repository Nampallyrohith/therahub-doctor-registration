import Login from "@/shared/Login";
import SignUp from "@/shared/Signup";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/Logo.png";
import { useFetchData } from "@/hooks/apiCall";
import { LoginSchema, SignUpSchema } from "@/modals/typeDefinitions";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize isLogin based on the URL query parameter
  const [isLogin, setIsLogin] = useState<boolean>(
    new URLSearchParams(location.search).get("signup") ? false : true
  );
  const [signupSuccess, setSignUpSuccess] = useState<boolean>(false);

  const { call: loginAPICaller, loading: loginLoading } = useFetchData<{
    token: string;
    doctor: {
      id: string;
      fullName: string;
      email: string;
    };
  }>();
  const { call: signUpAPICaller, loading: signUpLoading } = useFetchData();

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    navigate(isLogin ? "?login" : "?signup", { replace: true });
  }, [isLogin, navigate]);

  const handleLogin = async (data: LoginSchema) => {
    const response = await loginAPICaller(
      "doctor-authentication/login",
      "POST",
      data
    );
    console.log(response);

    if (!response.ok) {
      toast(response.error, {
        position: "bottom-right",
        style: { backgroundColor: "#eb3b41", color: "#fff" },
      });
      return;
    }

    localStorage.setItem("doctorToken", response.data.token);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleSignUp = async (data: SignUpSchema) => {
    console.log(data);
    const body = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    const response = await signUpAPICaller(
      "doctor-authentication/signup",
      "POST",
      body
    );

    if (!response.ok) {
      toast(response.error, {
        position: "bottom-right",
        style: { backgroundColor: "#eb3b41", color: "#fff" },
      });
      return;
    }

    setTimeout(() => {
      setSignUpSuccess(true);
      setIsLogin(true);
    }, 1000);
  };

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
        {isLogin ? (
          <Login
            onSubmit={handleLogin}
            loading={loginLoading}
            setIsLogin={setIsLogin}
          />
        ) : (
          <SignUp
            onSubmit={handleSignUp}
            loading={signUpLoading}
            setIsLogin={setIsLogin}
          />
        )}
        {signupSuccess && (
          <p className="text-green-500 bg-green-200 rounded-3xl border-2 p-4 !my-3 border-dotted">
            Your account successfully registered, Please Login now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Authentication;
