import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import styles from './HeroesInfo.module.sass';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const HeroesInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loadingHero, setLoadingHero] = useState(false);
    const [innerActive, setInnerActive] = useState(false);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (props.char !== null) {
            handleCharClose();
        }
    }, [props.charId])

    const handleCharClose = () => {
        setClosing(true);
        setTimeout(() => {
            updateChar();
        }, 400);
    };

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        setLoadingHero(true);
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .finally(() => {
                setLoadingHero(false);
                setClosing(false);
            });
    };

    const onCharLoaded = (char) => {
        setChar(char);
        setInnerActive(true);
    }

    const heroSpinner = !innerActive && loadingHero ? <Spinner /> : null;
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = innerActive && loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return(
        <div className={styles.spin}>
            {heroSpinner}
            <div
                className={`${styles.inner} 
                            ${char ? styles.active : ''}
                            ${closing ? styles.closing : ''}`}>
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return (
       <>
            <div className={styles.name}>
                    <img className={styles.img} src={thumbnail} alt={name}/>
                    <div className={styles.link}>
                        <h3>{name}</h3>
                        <a href={homepage}>
                            <button>HOMEPAGE</button>
                        </a>
                        <a href={wiki}>
                            <button>WIKI</button>
                        </a>
                    </div>
                </div>
                <div className={styles.descr}>
                    <p>
                        {description}
                    </p>
                </div>
                <div className={styles.list}>
                    <h3>Comics:</h3>
                    <ul className={styles.item}>
                        {comics.length > 0 ? null : 'No Comics' }
                        {
                            comics.map((item, i) => {
                                // if (i > 5) return;
                                return (
                                    <li key={i}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
            </div>
       </>
    )
}

HeroesInfo.propTypes = { charId: PropTypes.number }

export default HeroesInfo;