import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

const Home = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      {session ? <p>Hi , {session.user.name}</p> : <p>Login to Quicknotes</p>}
    </div>
  )
}

export default Home
