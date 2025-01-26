import { AuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
export const options:AuthOptions ={
    providers: [
        GitHubProvider({
        //   name:"Github",
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        })
      ]
};