import styles from './AppHeader.module.sass';
import MarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import React from 'react';

const AppHeader = (props) => {

    const [wiki, setWiki] = useState('');
    const marvelService = new MarvelService();

    useEffect(() => {
        const { characterId } = props;
        if (characterId) {
            const fetchCharacter = async () => {
                try {
                    const character = await marvelService.getCharacter(characterId);
                    setWiki(character.wiki);
                } catch (error) {
                    console.log('Error', error)
                }
            };

            fetchCharacter();
        }
    }, [props.characterId, marvelService]);

    return (
        <header className={styles.header}>
            <h1>
                <a href={wiki}>
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="">Characters</a></li>
                    /
                    <li><a href="">Comics</a></li>
                </ul>
            </nav>
        </header>
    )

}

export default AppHeader;