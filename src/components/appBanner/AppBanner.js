import Avengers from '../../assets/img/banner/Avengers.png';
import Logo from '../../assets/img/banner/Logo.png';
import styles from './AppBanner.module.sass';

const AppBanner = () => {
    return (
        <div className={styles.bannerInner}>
            <img src={Avengers} alt="Avengers" />
            <h3>
                New comics every week! <br/>
                Stay tuned!
            </h3>
            <img src={Logo} alt="Logo"/>
        </div>
    )
}

export default AppBanner;