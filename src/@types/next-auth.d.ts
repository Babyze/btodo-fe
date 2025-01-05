import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    expireDate: number;
  }

  interface Session {
    user: User;
    session: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expireDate: number;
  }
}
