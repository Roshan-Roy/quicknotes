import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import styles from "./page.module.css"
import Note from "@/components/note/Note"

const NotesPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes/all/${session.user.id}`, {
    cache: "no-store"
  })
  if (!res.ok) {
    throw new Error("Something went worng")
  }
  const { data } = await res.json()
  return (
    <div className={styles.wrapper}>
      {data.length === 0 ? "No notes found" : data.map(e => <Note key={e.id} {...e} />)}
    </div>
  )
}

export default NotesPage