export interface LoginSchema {
  email: string;
  password: string;
}

export interface SignUpSchema extends LoginSchema {
  fullName: string;
}
