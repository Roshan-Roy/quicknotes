import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import styles from "./page.module.css"
import Note from "@/components/note/Note"
import { TbNotesOff } from "react-icons/tb"

const NotesPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes/all/${session.user.id}`, {
    cache: "no-store"
  })
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message)
  }
  const { data } = await res.json()
  if (data.length === 0) {
    return (
      <div className={styles.le_wrapper}>
        <div>
          <TbNotesOff className={styles.le_svg}/>
          <h3>No notes found</h3>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      {data.map(e => <Note key={e.id} {...e} />)}
    </div>
  )
}

export default NotesPage