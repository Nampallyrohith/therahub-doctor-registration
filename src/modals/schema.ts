import { z } from "zod";

export const Doctorschema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  phone: z.string().min(1, { message: "Mobile number is required" }),
  age: z.number(),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  about: z.string().min(1, { message: "Bio is required" }),
  specialistIn: z.string().min(1, { message: "Specialisation is required" }),
  experience: z.number(),
  therapyId: z.enum([
    "behavioural",
    "psychodynamic",
    "cognitiveBehavioural",
    "humanistic",
  ]),
  avatarUrl: z.string().min(1, { message: "Doctor profile url is mandatory" }),
  gender: z.string().min(1, { message: "Gender is required" }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export const signUpSchema = z
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

export const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const passwordSchema = z
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
