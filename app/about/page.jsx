import styles from "./page.module.css"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import Link from "next/link"

const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>About QNotes</h2>
      <p>A secure note taking app built with Next.js and MongoDB.  Stay organized and access your notes from anywhere!  QNotes allows you to create, edit, and delete notes with ease.  Authenticate securely using credentials or GitHub to keep your notes private using nextauth V4.</p>
      <h2>About Next JS</h2>
      <p>A popular framework built on React, streamlines the creation of modern web applications. It leverages React's power for user interfaces, but adds features like server-side rendering and static site generation to boost SEO and initial load times.  Fetching data and routing are simplified, while automatic code splitting keeps your app performant. With built-in features and a vast community, Next.js empowers you to build scalable React applications efficiently.</p>
      <h2>Devloped By</h2>
      <p className={styles.developer}>Roshan Roy</p>
      <ul>
        <li><Link href="https://www.linkedin.com/in/roshan-roy-8a960b270" target="_blank"><FaLinkedin /></Link></li>
        <li><Link href="https://www.instagram.com/rosshhaan__?igsh=YTQwZjQ0NmI0OA==" target="_blank"><FaInstagram /></Link></li>
        <li><Link href="https://github.com/Roshan-Roy" target="_blank"><FaGithub /></Link></li>
      </ul>
    </div>
  )
}

export default AboutPage