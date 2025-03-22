import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import emailIcon from "../assets/images/AuthenticationIcons/email-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";
import { EmailInputs, PasswordInputs } from "@/modals/typeDefinitions";
import { emailSchema, passwordSchema } from "@/modals/schema";
import { ThreeDot } from "react-loading-indicators";

interface ForgotPasswordProps {
  handleForgotPassword: (email: EmailInputs, passwords: PasswordInputs) => void;
  setShowForgotPassword: (isBool: boolean) => void;
  forgotPasswordLoading: boolean;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setShowForgotPassword,
  handleForgotPassword,
  forgotPasswordLoading,
}) => {
  const [step, setStep] = useState(1);

  const emailForm = useForm<EmailInputs>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordInputs>({
    resolver: zodResolver(passwordSchema),
  });

  const handleEmailSubmit: SubmitHandler<EmailInputs> = () => {
    if (!emailForm.formState.errors.email) {
      setStep(2);
    }
  };
  const handlePasswordSubmit: SubmitHandler<PasswordInputs> = (data) => {
    handleForgotPassword(emailForm.getValues(), data);
  };

  return (
    <div className="lg:mt-28 flex flex-col items-center gap-5 w-full">
      <h1 className="text-2xl text-orange-primary-1">
        {step === 1 ? "Forgot Password" : "Reset Your Password"}
      </h1>

      <div className="w-11/12 md:w-3/4 lg:w-[400px] flex items-center justify-center mt-5">
        {step === 1 ? (
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
          >
            <div className="flex items-center bg-[#AAE9E3] rounded-full w-full h-12 px-5">
              <input
                {...emailForm.register("email")}
                className="border-none outline-none bg-transparent placeholder-gray-600 text-gray-600 w-full"
                placeholder="Enter your email"
              />
              <img src={emailIcon} alt="Email Icon" className="w-5 ml-3" />
            </div>
            {emailForm.formState.errors.email && (
              <p className="text-red-500 text-xs !ml-5">
                *{emailForm.formState.errors.email.message}
              </p>
            )}
            <div className="flex flex-col items-center gap-2">
              <Button
                type="submit"
                className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c]"
              >
                Next
              </Button>
            </div>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          >
            {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <div className="flex items-center bg-[#AAE9E3] rounded-full w-full h-12 px-5">
                  <input
                    type="password"
                    {...passwordForm.register(field as keyof PasswordInputs)}
                    className="border-none outline-none bg-transparent placeholder-gray-600 text-gray-600 w-full"
                    placeholder={
                      field === "oldPassword"
                        ? "Old Password"
                        : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"
                    }
                  />
                  <img
                    src={passwordIcon}
                    alt="Password Icon"
                    className="w-5 ml-3"
                  />
                </div>
                {passwordForm.formState.errors[
                  field as keyof PasswordInputs
                ] && (
                  <p className="text-red-500 text-xs !ml-5">
                    *
                    {
                      passwordForm.formState.errors[
                        field as keyof PasswordInputs
                      ]?.message
                    }
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#ff9f1c] w-28 py-1 rounded-lg hover:bg-[#ff9f1c]"
                disabled={forgotPasswordLoading}
              >
                {forgotPasswordLoading ? (
                  <ThreeDot easing="ease-in" size="small" color="#fff" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
      <button
        type="button"
        className=" !my-4 underline cursor-pointer text-[#ff9f1c]"
        onClick={() => setShowForgotPassword(false)}
      >
        Return to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
