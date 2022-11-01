import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Auth } from 'aws-amplify'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'todo@app.guru',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const user = await Auth.signIn(
                    credentials?.email,
                    credentials?.password
                )
                console.log(user);
                
                return { name: user }
            },
        }),
    ],
}

export default NextAuth(authOptions)