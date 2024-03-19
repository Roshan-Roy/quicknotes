import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Profile from "@/components/profile/Profile"

const ProfilePage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    return <Profile {...session} />
}

export default ProfilePage