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
