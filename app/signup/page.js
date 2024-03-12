import Signup from "@/components/auth/signup/Signup"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const SignupPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }
  return <Signup />
}

export default SignupPage