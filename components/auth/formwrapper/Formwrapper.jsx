import Link from "next/link"
import styles from "./formwrapper.module.css"
import { signIn } from "next-auth/react"
import Btnloader from "@/components/btnloader/Btnloader"
import { FaGithub } from "react-icons/fa"
import { Prompt } from "next/font/google"

const prompt = Prompt({
    weight: "400",
    subsets: ["latin"]
  });
  

const Formwrapper = ({
    children,
    heading,
    linkText,
    route,
    auth = false,
    gLoading,
    uptGLoading,
    disabled,
    uptDisabled
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>{heading}</h2>
                <div className={styles.form_container}>
                    {children}
                    {auth &&
                        (
                            <div className={styles.btn_container}>
                                <button className={`${prompt.className} ${styles.github} ${disabled && styles.disabled}`} disabled={disabled} onClick={() => {
                                    signIn("github", {
                                        callbackUrl: "/notes"
                                    })
                                    uptDisabled(true)
                                    uptGLoading(true)
                                }}><FaGithub className={styles.github_icon}/> {!gLoading && "Github Login"}</button>
                                {gLoading && <Btnloader />}
                            </div>
                        )
                    }
                    <hr />
                    <Link href={route}>{linkText}</Link>
                </div>
            </div>
        </div>
    )
}

export default Formwrapper