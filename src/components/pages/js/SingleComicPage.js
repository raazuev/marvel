import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import styles from '../style/SingleComicPage.module.sass';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {

    const {title, description, pageCount, thumbnail, price} = comic;

    return (
        <div className={styles.singleInner}>
            <div className={styles.singleInfo}>
                <div className={styles.img}>
                    <img src={thumbnail} alt={title} />
                </div>
                <div className={styles.descr}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>{pageCount}</p>
                    <p>{price}</p>
                </div>
            </div>
            <Link className={styles.link} to='/comics'>Back to all</Link>
        </div>
    )
}

export default SingleComicPage;