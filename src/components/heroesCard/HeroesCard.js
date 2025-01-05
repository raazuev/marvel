import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import styles from './HeroesCard.module.sass';

const HeroesCard = (props) => {

    const [heroesCard, setHeroesCard] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newHeroesCard) => {
        let ended = false;
        if (newHeroesCard.length < 8) {
            ended = true;
        }

        setHeroesCard(heroesCard => [...heroesCard, ...newHeroesCard]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended);
    }

    function renderItems(arr) {

        console.log('render');
        
        const items = arr.map((item) => {
            return (
                <ul 
                    tabIndex={0}
                    className={styles.item}
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}
                    onFocus={() => ({ focuseItem: item.id})}
                    onBlur={() => ({ focuseItem: null})}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} className={styles.img} />
                    <p className={styles.name}>{item.name}</p>
                </ul>
            );
        });

        return (
            <div className={styles.card}>
                {items}
            </div>
        );
    }

    const items = renderItems(heroesCard);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className={styles.heroesCard}>
            {errorMessage}
            <div className={styles.spinner}>
                {spinner}
            </div>
            {items}
            <div className={styles.btn}>
                <button
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    LOAD MORE
                </button>
            </div>
        </div>
    );
}

HeroesCard.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default HeroesCard;