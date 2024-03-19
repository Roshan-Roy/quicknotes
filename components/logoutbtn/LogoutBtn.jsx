"use client"

import Btnloader from "../btnloader/Btnloader"
import styles from "./logout.module.css"
import { useState } from "react"
import { Prompt } from "next/font/google"
import { signOut } from "next-auth/react"

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"]
});


const LogoutBtn = () => {
  const [loading, uptLoading] = useState(false)
  return (
    <div className={styles.container}>
      <button className={`${prompt.className} ${loading ? styles.disabled : null}`} onClick={() => {
        uptLoading(true)
        signOut()
      }} disabled={loading}>Logout</button>
      {loading && <Btnloader />}
    </div>
  )
}

export default LogoutBtn