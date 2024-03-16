import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Add from "@/components/add/Add"

const AddNotesPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  return <Add {...session} />
}

export default AddNotesPage