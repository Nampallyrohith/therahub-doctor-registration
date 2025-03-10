import profileIcon from "../assets/images/AuthenticationIcons/profile-icon.png";
import { SubmitHandler, useForm } from "react-hook-form";
import userIcon from "../assets/images/AuthenticationIcons/user-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";
import emailIcon from "../assets/images/AuthenticationIcons/email-icon.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignUpSchema } from "@/modals/typeDefinitions";
import { ThreeDot } from "react-loading-indicators";

const schema = z
  .object({
    fullName: z.string().nonempty("Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Inputs = z.infer<typeof schema>;

interface singupProps {
  onSubmit: (data: SignUpSchema) => void;
  loading: boolean;
}

const SignUp: React.FC<singupProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const SignUpSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="lg:mt-28 self-center flex flex-col justify-center items-center gap-5 w-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="w-10 self-center"
        />
        <h1 className="text-2xl text-orange-primary-1 whitespace-nowrap">
          Create a new Account
        </h1>
      </div>
      <div className="w-11/12 md:w-3/4 lg:w-[400px] inset-6 flex items-center justify-center mt-5">
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(SignUpSubmit)}
        >
          {/* Full Name */}
          <div className="flex justify-between items-center bg-[#AAE9E3] rounded-full w-full h-12 text-orange-primary-1 pr-4">
            <input
              {...register("fullName")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent placeholder-gray-600 text-gray-600 w-full"
              placeholder="Full Name"
            />
            <img src={userIcon} alt="Icon" className="w-5 mr-4" />
          </div>
          {errors.fullName?.message && (
            <div className="text-red-500 text-xs">
              {errors.fullName.message}
            </div>
          )}
          {/* Email */}
          <div className="flex justify-between items-center bg-[#AAE9E3] rounded-full w-full h-12 text-orange-primary-1 pr-4">
            <input
              {...register("email")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Email Id"
            />
            <img src={emailIcon} alt="Icon" className="w-5  mr-4" />
          </div>
          {errors.email?.message && (
            <div className="text-red-500 text-xs">{errors.email.message}</div>
          )}

          {/* Password */}
          <div className="flex justify-between items-center bg-[#AAE9E3]  rounded-full w-full h-12 text-orange-primary-1 pr-4">
            <input
              type="password"
              {...register("password")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Password"
            />
            <img src={passwordIcon} alt="Icon" className="w-5 " />
          </div>
          {errors.password?.message && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}

          {/* Confirm Password */}
          <div className="flex justify-between items-center bg-[#AAE9E3]  rounded-full w-full h-12 text-orange-primary-1 pr-4">
            <input
              type="password"
              {...register("confirmPassword")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Confirm Password"
            />
            <img src={passwordIcon} alt="Icon" className="w-5 " />
          </div>

          {/* Submit Button */}
          <div className="text-center !mt-4 !mb-10">
            <Button
              type="submit"
              className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c] cursor-pointer tracking-wider text-base hover:shadow-lg hover:scale-105 hover:ease-in-out hover:delay-200"
            >
              {loading ? (
                <ThreeDot easing="ease-in" size="small" color="#fff" />
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
