import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import styles from './HeroesInfo.module.sass';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const HeroesInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return(
        <div className={styles.inner}>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
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