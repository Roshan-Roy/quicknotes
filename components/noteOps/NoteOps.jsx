"use client"

import styles from "./noteops.module.css"
import { MdDeleteOutline } from "react-icons/md"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const NoteOps = ({ user, note, id }) => {
    const router = useRouter()
    const [data, uptData] = useState(note)
    const style = {
        position: "bottom-center"
    }
    const handleUpdateBtnClick = async () => {
        toast.remove()
        if (!data.trim()) {
            toast.error("Note is empty", style)
            return
        }
        const res = await fetch(`/api/notes/update/${user.id}?noteid=${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: data.trim()
            })
        })
        const { message } = await res.json()
        if (!res.ok) {
            toast.error(message)
        } else {
            router.back()
            router.refresh()
            toast.success(message)
        }
    }
    return (
        <div className={styles.wrapper}>
            <textarea placeholder="Change Note" value={data} onChange={elm => uptData(elm.target.value)}></textarea>
            <div>
                <button className={styles.upt_btn} onClick={handleUpdateBtnClick}>Update</button>
                <button className={styles.dlt_btn}><MdDeleteOutline /></button>
            </div>
        </div>
    )

}

export default NoteOps