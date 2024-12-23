import error from '../../assets/img/error/error.gif';
import styles from './ErrorMessage.module.sass';

const ErrorMessage = () => {
    return (
        <img className={styles.error} src={error} alt="error" />
    )
}

export default ErrorMessage;