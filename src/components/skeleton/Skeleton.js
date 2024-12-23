import styles from './Skeleton.module.sass';

const Skeleton = () => {
    return (
        <>
            <p className={styles.title}>Please select a character to see information</p>
            <div className={styles.skeleton}>
                <div className={styles.header}>
                    <div className={styles.circle}></div>
                    <div className={styles.mini}></div>
                </div>
                <div className={styles.block}></div>
                <div className={styles.block}></div>
                <div className={styles.block}></div>
            </div>
        </>
    )
}

export default Skeleton;