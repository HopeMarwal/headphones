import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@/models/users";
import { connectToDb } from "@/utils/database";

const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      session.user.id = sessionUser._id.toString()
      return session
    },
    // Sign in if user exists 
    async signIn({ profile }) {
      try {
        await connectToDb()
        const userExists = await User.findOne({
          email: profile.email
        })
        //if no user create one

        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.image
          })
        }
        return true
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export { handler as GET, handler as POST}