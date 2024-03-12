import Login from "@/components/auth/login/Login"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }
  return <Login />
}

export default LoginPage