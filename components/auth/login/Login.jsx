"use client"

import Formwrapper from "../formwrapper/Formwrapper"
import styles from "../auth.module.css"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Btnloader from "@/components/btnloader/Btnloader"
import { Prompt } from "next/font/google"

const prompt = Prompt({
    weight: "400",
    subsets: ["latin"]
});


const Login = () => {
    const [cLoading, uptCLoading] = useState(false)
    const [gLoading, uptGLoading] = useState(false)
    const [disabled, uptDisabled] = useState(false)
    const router = useRouter()
    const [data, uptData] = useState({
        username: "",
        password: ""
    })
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        toast.remove()
        const username = data.username.trim()
        const password = data.password.trim()
        if (!username || !password) {
            toast.error("Fill all fields")
        } else {
            uptCLoading(true)
            uptDisabled(true)
            const { error, ok } = await signIn("credentials", {
                username,
                password,
                redirect: false
            })
            if (!ok) {
                toast.error(error)
                uptCLoading(false)
                uptDisabled(false)
            } else {
                toast.success("Login completed")
                router.push("/notes")
                router.refresh()
            }
        }
    }
    return (
        <Formwrapper
            heading="Log In"
            linkText="Sign Up"
            route="/signup"
            auth={true}
            gLoading={gLoading}
            uptGLoading={uptGLoading}
            disabled={disabled}
            uptDisabled={uptDisabled}
        >
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Username" value={data.username} onChange={(elm) => uptData((e) => ({ ...e, username: elm.target.value }))} />
                <input type="password" placeholder="Password" value={data.password} onChange={(elm) => uptData((e) => ({ ...e, password: elm.target.value }))} />
                <div>
                    <button type="submit" disabled={disabled} className={`${prompt.className} ${disabled ? styles.disabled : null}`}>Login</button>
                    {cLoading && <Btnloader />}
                </div>
            </form>
        </Formwrapper>
    )
}

export default Login