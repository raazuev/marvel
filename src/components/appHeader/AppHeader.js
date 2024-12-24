import { Link, NavLink } from 'react-router-dom';
import styles from './AppHeader.module.sass';
import React from 'react';

const AppHeader = () => {

    return (
        <header className={styles.header}>
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
                    /
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