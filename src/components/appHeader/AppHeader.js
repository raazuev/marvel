import { Link, NavLink } from 'react-router-dom';
import styles from './AppHeader.module.sass';
import React, {useEffect, useState} from 'react';
 
const AppHeader = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
            <h1>
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink
                                end
                                to='/' 
                                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : `${styles.link}`}>
                                Characters
                        </NavLink>
                    </li>
                    <li><NavLink 
                                end
                                to='/comics' 
                                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : `${styles.link}`}>
                                Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )

}

export default AppHeader;