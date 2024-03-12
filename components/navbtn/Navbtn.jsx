import styles from "./navbtn.module.css"
import toast from "react-hot-toast"

const Navbtn = ({ open, func }) => {
    return (
        <div onClick={() => {
            func()
            toast.remove()
        }} className={`${styles.nav_btn} ${open && styles.open}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Navbtn