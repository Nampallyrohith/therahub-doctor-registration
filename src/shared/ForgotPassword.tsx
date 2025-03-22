import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import emailIcon from "../assets/images/AuthenticationIcons/email-icon.png";
import passwordIcon from "../assets/images/AuthenticationIcons/password-icon.png";

const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old Password is required"),
    newPassword: z
      .string()
      .min(8, "New Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must match"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailInputs = z.infer<typeof emailSchema>;
type PasswordInputs = z.infer<typeof passwordSchema>;

interface ForgotPasswordProps {
  onSubmit?: (data: PasswordInputs) => void;
  loading?: boolean;
  setShowForgotPassword: (isBool: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSubmit,
  loading = false,
  setShowForgotPassword,
}) => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const emailForm = useForm<EmailInputs>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordInputs>({
    resolver: zodResolver(passwordSchema),
  });

  const handleEmailSubmit: SubmitHandler<EmailInputs> = () => setStep(2);
  const handlePasswordSubmit: SubmitHandler<PasswordInputs> = (data) => {
    onSubmit?.(data);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
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
              <button
                type="button"
                className=" !my-4 underline cursor-pointer text-[#ff9f1c]"
                onClick={() => setShowForgotPassword(false)}
              >
                Return to Login
              </button>
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
                    *{
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
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        )}
      </div>
      {success && (
        <div className="bg-green-500 text-white text-sm p-2 rounded-md mt-3">
          ✅ Password updated successfully!
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
