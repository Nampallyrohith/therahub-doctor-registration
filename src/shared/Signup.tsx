import profileIcon from "../assets/images/AuthenticationIcons/profile-icon.png";
import { SubmitHandler, useForm } from "react-hook-form";
import userIcon from "../assets/images/AuthenticationIcons/user-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";
import emailIcon from "../assets/images/AuthenticationIcons/email-icon.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    fullName: z.string().nonempty("Full Name is required"),
    emailId: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Inputs = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("emailId")}
              className="px-5 border-none outline-none focus:outline-none focus:ring-0 bg-transparent  placeholder-gray-600 text-gray-600 w-full"
              placeholder="Email Id"
            />
            <img src={emailIcon} alt="Icon" className="w-5  mr-4" />
          </div>
          {errors.emailId?.message && (
            <div className="text-red-500 text-xs">{errors.emailId.message}</div>
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
              type="button"
              className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c] cursor-pointer tracking-wider text-base hover:shadow-lg hover:scale-105 hover:ease-in-out hover:delay-200"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
