import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import styles from '../style/SingleCharSearch.module.sass';

const CharacterPage = () => {
    const { id } = useParams();
    const { loading, error, getCharacter } = useMarvelService();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        getCharacter(id).then(setCharacter);
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage />;
    if (!character) return null;

    console.log('find')

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${character.name} cart`}
                    />
                <title>{character.name}</title>
            </Helmet>
            <div className={styles.link}>
                <Link className={styles.searchLink} to='/'>Back to all</Link>
            </div>
            <div className={styles.searchInner}>
                <div className={styles.searchImg}>
                    <img src={character.thumbnail} />
                </div>
                <div className={styles.searchDescr}>
                    <h2>{character.name}</h2>
                    <p>{character.description}</p>
                </div>
            </div>
        </>
    );
};

export default CharacterPage;