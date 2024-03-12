import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const AddNotesPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  return (
    <div>AddNotes</div>
  )
}

export default AddNotesPage