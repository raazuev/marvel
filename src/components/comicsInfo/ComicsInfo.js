import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import styles from './ComicsInfo.module.sass';
import right from '../../assets/img/Decoration.png';

const ComicsInfo = () => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 3000);

    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className={styles.infoCard}>
            {errorMessage}
            {spinner}
            {content}
            <div className={styles.itemRight}>
                <div className={styles.innerRight}>
                    <h2>Random character for today! Do you want to get to know him better?</h2>
                    <h3>Or choose another one</h3>
                    <button onClick={updateChar}>TRY IT</button>
                </div>
                <img className={styles.imgRight} src={right} alt="Decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className={styles.itemLeft}>
            <div>
                <img src={thumbnail} alt="Thumbnail"/>
            </div>
            <div className={styles.innerLeft}>
                <h2>{name}</h2>
                <p>{description}</p>
                <div>
                    <a href={homepage}>
                        <button>HOMEPAGE</button>
                    </a>
                    <a href={wiki}>
                        <button className={styles.grey}>WIKI</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ComicsInfo;