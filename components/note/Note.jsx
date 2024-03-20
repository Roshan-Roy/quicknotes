"use client"
        
import styles from "./note.module.css"
import { useRouter } from "next/navigation"
      
const Note = ({ id, note }) => {
    const router = useRouter()
    return <p onClick={() => {router.push(`/notes/${id}`)}} className={styles.container}>{note}</p>
}   

export default Note