import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import ComicsInfo from '../comicsInfo/ComicsInfo';
import HeroesCard from '../heroesCard/HeroesCard';
import HeroesInfo from '../heroesInfo/HeroesInfo';
import styles from './App.module.sass';
import FormVadid from '../formValid/FormValid';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <ComicsInfo/>
                <div className={styles.heroesContent}>
                    <HeroesCard onCharSelected={onCharSelected}/>
                    <ErrorBoundary>
                        <HeroesInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <FormVadid/>
                </div>
            </main>
        </div>
    )

}

export default App;