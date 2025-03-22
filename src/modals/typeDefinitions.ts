import { z } from "zod";
import { emailSchema, passwordSchema } from "./schema";

export interface LoginSchema {
  email: string;
  password: string;
}

export interface SignUpSchema extends LoginSchema {
  fullName: string;
}

export type therapyIdEnum =
  | "behavioural"
  | "psychodynamic"
  | "cognitiveBehavioural"
  | "humanistic";

export interface Doctor {
  name: string;
  email: string;
  gender: string;
  phone: string;
  age: number;
  qualification: string;
  about: string;
  specialistIn: string;
  experience: number;
  therapyId: therapyIdEnum;
  avatarUrl: string;
}

export interface DoctorProfile extends Doctor {
  isProfile: boolean;
}

export interface CalendarFormType {
  title: string;
  description: string;
  dates: string;
}

export interface LeaveDatesDetails extends CalendarFormType {
  status: "upcoming" | "previous" | "cancelled";
  createdAt: string;
  id: number;
}

export type EmailInputs = z.infer<typeof emailSchema>;
export type PasswordInputs = z.infer<typeof passwordSchema>;
