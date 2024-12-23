import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import styles from './HeroesCard.module.sass';

const HeroesCard = (props) => {

    const [heroesCard, setHeroesCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newHeroesCard) => {
        let ended = false;
        if (newHeroesCard.length < 9) {
            ended = true;
        }

        setHeroesCard(heroesCard => [...heroesCard, ...newHeroesCard]);
        setLoading(false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false)
    }

    function renderItems(arr) {
        if (!arr || arr.length === 0) {
            return <p>No characters found.</p>;
        }

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
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className={styles.heroesCard}>
            {errorMessage}
            <div className={styles.spinner}>
                {spinner}
            </div>
            {content}
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