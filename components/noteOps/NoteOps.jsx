"use client"

import styles from "./noteops.module.css"
import { MdDeleteOutline } from "react-icons/md"
import { useState } from "react"
import toast from "react-hot-toast"
import Btnloader from "../btnloader/Btnloader"
import { useRouter } from "next/navigation"
import { Prompt } from "next/font/google"

const prompt = Prompt({
    weight: "400",
    subsets: ["latin"]
});


const NoteOps = ({ user, note, id }) => {
    const router = useRouter()
    const [uLoading, uptULoading] = useState(false)
    const [dLoading, uptDLoading] = useState(false)
    const [disabled, uptDisabled] = useState(false)
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
        uptULoading(true)
        uptDisabled(true)
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
            uptULoading(false)
            uptDisabled(false)
        } else {
            router.push("/notes")
            router.refresh()
            toast.success(message)
        }
    }
    const handleDeleteBtnClick = async () => {
        uptDLoading(true)
        uptDisabled(true)
        const res = await fetch(`/api/notes/delete/${user.id}?noteid=${id}`, {
            method: "DELETE"
        })
        const { message } = await res.json()
        if (!res.ok) {
            toast.error(message)
            uptDLoading(false)
            uptDisabled(false)
        } else {
            router.push("/notes")
            router.refresh()
            toast.success(message)
        }
    }
    return (
        <div className={styles.wrapper}>
            <textarea placeholder="Change Note" value={data} onChange={elm => uptData(elm.target.value)}></textarea>
            <div>
                <button className={`${prompt.className} ${styles.upt_btn} ${disabled && styles.disabled}`} onClick={handleUpdateBtnClick} disabled={disabled}>Update</button>
                {uLoading && <Btnloader />}
                <button className={`${styles.dlt_btn} ${disabled && styles.disabled}`} onClick={handleDeleteBtnClick} disabled={disabled}><MdDeleteOutline /></button>
                {dLoading && <Btnloader />}
            </div>
        </div>
    )

}

export default NoteOps