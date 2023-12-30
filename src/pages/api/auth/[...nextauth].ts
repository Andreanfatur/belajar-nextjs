import { signIn, signInWidthGoogle } from "@/utils/db/service";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const authOptios: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });
        if (user) {
          const passwordConfirm = await compareSync(password, user.password);
          if (passwordConfirm) {
            return user;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };
        await signInWidthGoogle(
          data,
          (result: { data: any; status: boolean; message: string }) => {
            if (result.status) {
              token.name = result.data.name;
              token.email = result.data.email;
              token.type = result.data.type;
              token.image = result.data.image;
              token.role = result.data.role;
            }
          }
        );
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("type" in token) {
        session.user.type = token.type;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
export default nextAuth(authOptios);
