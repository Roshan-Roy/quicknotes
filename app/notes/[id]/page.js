import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import styles from "../page.module.css"
import NoteOps from "@/components/noteOps/NoteOps"
import { IoMdCloseCircleOutline } from "react-icons/io"

const NotePage = async ({ params }) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes/get/${session.user.id}?noteid=${params.id}`, {
            cache: "no-store"
        })
        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }
        const { data } = await res.json()
        return <NoteOps {...session} {...data} />
    } catch (e) {
        return (
            <div className={styles.le_wrapper}>
                <div>
                    <IoMdCloseCircleOutline className={styles.le_svg} />
                    <h3>{e.message}</h3>
                </div>
            </div>
        )
    }
}

export default NotePage