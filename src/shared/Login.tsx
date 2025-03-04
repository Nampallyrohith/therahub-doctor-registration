import profileIcon from "../assets/images/AuthenticationIcons/profile-icon.png";
import { useForm } from "react-hook-form";
import userIcon from "../assets/images/AuthenticationIcons/user-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

type Inputs = z.infer<typeof schema>;

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="self-center flex flex-col justify-center items-center gap-5 w-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="w-10 self-center my-4"
        />
        <h1 className="text-2xl text-orange-primary-1">Login</h1>
      </div>
      <div className=" w-3/4 md:w-3/5 lg:w-[400px]  flex items-center justify-center mt-5">
        <form className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center bg-[#AAE9E3] placeholder-orange-primary-1 rounded-full w-full pr-4 h-12 text-orange-primary-1">
            <input
              {...register("email")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Email"
            />
            <img src={userIcon} alt="Icon" className="w-5 mr-4" />
          </div>
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email.message}</div>
          )}

          <div className="flex justify-between items-center bg-[#AAE9E3] placeholder-orange-primary-1 rounded-full w-full pr-4 h-12 text-orange-primary-1">
            <input
              {...register("password")}
              type="password"
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Password"
            />
            <img src={passwordIcon} alt="Icon" className="w-5 " />
          </div>
          {errors.password && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}
          {/* <div className="flex justify-start items-center gap-3 w-full my-4"> */}
          {/* </div> */}

          <div className="text-center !mt-6 !mb-2">
            <Button
              type="button"
              className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c] cursor-pointer tracking-wider text-base hover:shadow-lg hover:scale-105 hover:ease-in-out hover:delay-200"
            >
              Login
            </Button>
          </div>
          <button
            type="button"
            className="text-[#FFB941]  !mb-4 hover:underline"
          >
            Forget password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
