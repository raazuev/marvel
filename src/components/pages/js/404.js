import { Link } from "react-router-dom";
import styles from '../style/404.module.sass';

const Page404 = () => {
    return (
        <div className={styles.pageError}>
            <div className={styles.animInner}>
                <div className={styles.text}><p>4</p></div>
                <div className={styles.text}><p>0</p></div>
                <div className={styles.text}><p>4</p></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
            </div>
            <Link className={styles.link} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;