import { AuthResponse, User } from "@/shared/types";

declare module "next-auth" {
  interface Session {
    user: AuthResponse["user"];
    token: string;
  }

  interface User extends AuthResponse {}
}

declare module "next-auth/jwt" {
  interface JWT extends AuthResponse {}
}