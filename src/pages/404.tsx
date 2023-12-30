import styles from "@/styles/404.module.scss";
const Custom404=()=>{
    return(
        <div className={styles.error}>
            <img src="/not_found.png" alt="" width={400} height={200}/>
            <h2 className="text-2xl">not found page</h2>
        </div>
    )
}
export default Custom404;