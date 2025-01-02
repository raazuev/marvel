import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ComicsInfo from '../../comicsInfo/ComicsInfo';
import HeroesCard from '../../heroesCard/HeroesCard';
import FormCharSearch from '../../formCharSearch/FormCharSearch';
import HeroesInfo from '../../heroesInfo/HeroesInfo';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import styles from '../style/MainPage.module.sass';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const [infoVisible, setInfoVisible] = useState(false);

    const onCharSelected = (id) => {
        if (selectedChar === id) {
            setInfoVisible(!infoVisible)
        } else {
            setChar(id);
            setInfoVisible(true);
        }
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel portal"
                    />
                <title>Marvel portal</title>
            </Helmet>
            <FormCharSearch/>
            <ComicsInfo/>
            <div className={styles.heroesContent}>
                <HeroesCard onCharSelected={onCharSelected}/>
                <ErrorBoundary>
                    {infoVisible && <HeroesInfo charId={selectedChar}/>}
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage;