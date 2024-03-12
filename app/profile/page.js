import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import LogoutBtn from "@/components/logoutbtn/LogoutBtn"

const ProfilePage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    return (
        <div>
            <p>{JSON.stringify(session)}</p>
            <LogoutBtn />
        </div>
    )
}

export default ProfilePage