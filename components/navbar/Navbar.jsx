"use client"

import Links from "../links/Links"
import styles from "./navbar.module.css"
import Navbtn from "../navbtn/Navbtn"
import { useSession } from "next-auth/react"
import { useState } from "react"

const Navbar = () => {
    const { status } = useSession()
    const [navbarOpen, uptNavbarOpen] = useState(false)
    let routeList;
    if (status === "authenticated") {
        routeList = [
            {
                name: "Home",
                path: "/"
            },
            {
                name: "All Notes",
                path: "/notes"
            },
            {
                name: "Add Note",
                path: "/add"
            },
            {
                name: "Profile",
                path: "/profile"
            },
            {
                name: "About",
                path: "/about"
            }
        ]
    } else {
        routeList = [
            {
                name: "Home",
                path: "/"
            },
            {
                name: "About",
                path: "/about"
            },
            {
                name: "Log In",
                path: "/login"
            },
            {
                name: "Sign Up",
                path: "/signup"
            }
        ]
    }

    const handleNavBtnClick = () => uptNavbarOpen(e => !e)
    const handleCloseNavbar = () => uptNavbarOpen(false)
    return (
        <>
            <div className={styles.border}></div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2>QNotes</h2>
                    <div className={`${styles.links_wrapper} ${navbarOpen && styles.shown}`}>{routeList.map(e => <Links key={e.name} func={handleCloseNavbar} {...e} />)}</div>
                    <Navbtn open={navbarOpen} func={handleNavBtnClick} />
                </div>
            </div>
        </>
    )
}

export default Navbar