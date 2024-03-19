import PageLoader from "@/components/pageloader/PageLoader"
import styles from "./page.module.css"

const loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <PageLoader />
    </div>
  )
}

export default loading