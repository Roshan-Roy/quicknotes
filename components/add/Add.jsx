"use client"

import styles from "./add.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Btnloader from "../btnloader/Btnloader"
import toast from "react-hot-toast"

const Add = ({ user }) => {
    const router = useRouter()
    const [note, uptNote] = useState("")
    const [disabled, uptDisabled] = useState(false)
    const style = { position: "bottom-center" }
    const handleAddBtnClick = async () => {
        toast.remove()
        if (!note.trim()) {
            toast.error("Note is empty", style)
            return
        }
        uptDisabled(true)
        const res = await fetch(`/api/notes/add/${user.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                note: note.trim()
            })
        })
        const { message } = await res.json()
        if (!res.ok) {
            toast.error(message, style)
            uptDisabled(false)
        } else {
            toast.success(message)
            router.push("/notes")
            router.refresh()
        }
    }
    return (
        <div className={styles.wrapper}>
            <textarea placeholder="New Note" value={note} onChange={(elm) => { uptNote(elm.target.value) }}></textarea>
            <div>
                <button className={disabled ? styles.disabled : null} onClick={handleAddBtnClick} disabled={disabled}>Add</button>
                {disabled && <Btnloader />}
            </div>
        </div>
    )
}

export default Add