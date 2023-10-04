import { login } from '@/api/signup';
import { parseJWT } from '@/utils/transform';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'email-password-credential',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const data = await login({ email, password });

        if (!data) {
          return null;
        }

        const jwt = parseJWT(data.accessToken);

        const user = { id: jwt.email, email: jwt.email, accessToken: data.accessToken, token: data.accessToken };

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
