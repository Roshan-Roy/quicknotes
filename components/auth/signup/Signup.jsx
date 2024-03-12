"use client"

import { useState } from "react"
import Formwrapper from "../formwrapper/Formwrapper"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Btnloader from "@/components/btnloader/Btnloader"
import styles from "../auth.module.css"

const Signup = () => {
  const router = useRouter()
  const [data, uptData] = useState({
    name: "",
    username: "",
    password: ""
  })
  const [disabled, uptDisabled] = useState(false)
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    toast.remove()
    const name = data.name.trim()
    const username = data.username.trim()
    const password = data.password
    if (!name || !username || !password) {
      toast.error("Fill all fields")
    } else if (name.length > 30) {
      toast.error("Name is too long")
    } else if (username.length < 5) {
      toast.error("Username is too short")
    } else if (username.length > 30) {
      toast.error("Username is too long")
    } else if (password.length < 4) {
      toast.error("Password is too short")
    } else {
      uptDisabled(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          password
        }),
      })

      const { message } = await res.json()

      if (!res.ok) {
        toast.error(message)
        uptDisabled(false)
      } else {
        toast.success(message)
        router.push("/login")
      }
    }
  }
  return (
    <Formwrapper
      heading="Sign Up"
      linkText="Login"
      route="/login"
    >
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Name" value={data.name} onChange={(elm) => uptData(e => ({ ...e, name: elm.target.value }))} />
        <input type="text" placeholder="Username" value={data.username} onChange={(elm) => uptData(e => ({ ...e, username: elm.target.value }))} />
        <input type="password" placeholder="Password" value={data.password} onChange={(elm) => uptData(e => ({ ...e, password: elm.target.value }))} />
        <div>
          <button type="submit" className={disabled ? styles.disabled : null} disabled={disabled}>Sign Up</button>
          {disabled && <Btnloader />}
        </div>
      </form>
    </Formwrapper>
  )
}

export default Signup