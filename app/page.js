import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import styles from "./page.module.css"
import Link from "next/link"

const Home = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Qnotes</h2>
        <p><span className={styles.name}>{session && `Hi ${session.user.name}, `}</span>Capture your thoughts with ease in this note taking app</p>
        <div className={styles.link_container}>
          {session ? <Link href="/notes">My Notes</Link> : <Link href="/login">Login</Link>}
          <Link href="/about" className={styles.about}>About Qnotes</Link>
        </div>
      </div>
    </div>
  )
}

export default Home

