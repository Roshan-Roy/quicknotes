import Link from "next/link"
import styles from "./links.module.css"
import { usePathname } from "next/navigation"

const Links = ({ name, path, func }) => {
    const pathName = usePathname()
    return (
        <Link href={path} onClick={func} className={`${styles.link} ${path === "/login" && styles.login} ${path === "/signup" && styles.signup} ${path === pathName && styles.active}`}>{name}</Link>
    )
}

export default Links