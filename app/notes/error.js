"use client"

import styles from "./page.module.css"
import { IoMdCloseCircleOutline } from "react-icons/io"

export default function Error({ error }) {
  return (
    <div className={styles.le_wrapper}>
      <div>
        <IoMdCloseCircleOutline className={styles.le_svg} />
        <h3>{error.message}</h3>
      </div>
    </div>
  )
}