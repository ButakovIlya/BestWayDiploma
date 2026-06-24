import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    status?: string;
    is_admin?: boolean;
    is_new_user?: boolean;
    access_token?: string;
    refresh_token?: string;
    detail?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's role */
    is_admin: boolean;
    is_new_user: boolean;
  }
}
