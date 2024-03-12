import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const NotesPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  return (
    <div>Notes</div>
  )
}

export default NotesPage