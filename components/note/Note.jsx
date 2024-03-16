import styles from "./note.module.css"

const Note = ({ id, note }) => {
    return (
        <div className={styles.container}>
            <p>{note}</p>
        </div>
    )
}

export default Note