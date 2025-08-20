import NextAuth,{NextAuthOptions} from "next-auth";

import { prisma } from "@repo/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session:{strategy:"jwt"},
  callbacks: {
    async jwt({ token, account, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.expiresAt = account.expires_at;
        }
        console.log(token);
        return token;
    },
    async session({ session, token }) {
        // Send properties to the client
        session.sessionToken = token.accessToken;
        return session;
    },
},
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };