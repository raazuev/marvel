import styles from './FormValid.module.sass';

const FormVadid = () => {
    return (
        <div className={styles.form}>
            <p>Or find a character by name:</p>
            <form>
                <input 
                    type="text"
                    placeholder='Enter name'
                />
                <button>FIND</button>
            </form>
        </div>
    )
}

export default FormVadid;