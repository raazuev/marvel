import { useState } from 'react';
import ComicsInfo from '../comicsInfo/ComicsInfo';
import HeroesCard from '../heroesCard/HeroesCard';
import HeroesInfo from '../heroesInfo/HeroesInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import styles from './MainPage.module.sass';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ComicsInfo/>
            <div className={styles.heroesContent}>
                <HeroesCard onCharSelected={onCharSelected}/>
                <ErrorBoundary>
                    <HeroesInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage;