import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import NoteOps from "@/components/noteOps/NoteOps"

const NotePage = async ({ params }) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }
    console.log("rendering")
    const { id } = params
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes/get/${session.user.id}?noteid=${id}`, {
        cache: "no-store"
    })
    if (!res.ok) {
        throw new Error("Something went wrong")
    }
    const { data } = await res.json()
    return <NoteOps {...session} {...data} />
}

export default NotePage