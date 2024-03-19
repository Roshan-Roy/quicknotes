import LogoutBtn from "../logoutbtn/LogoutBtn"
import styles from "./profile.module.css"

const Profile = ({ user }) => {
    return (
        <div className={styles.wrapper}>
            <h2>My Profile</h2>
            <div className={styles.container}>
                <p>Name : {user.name}</p>
                {user.username && <p>Username : {user.username}</p>}
                <LogoutBtn />
            </div>
        </div>
    )
}

export default Profile