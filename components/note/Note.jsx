import Link from "next/link"
import styles from "./note.module.css"

const Note = ({ id, note }) => {
    return (
        <Link href={`/notes/${id}`}>
            <div className={styles.container}>
                <p>{note}</p>
            </div>
        </Link>
    )
}

export default Note