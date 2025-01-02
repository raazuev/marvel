import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import {MainPage, ComicsPage, SingleComicPage, CharacterPage, Page404} from '../pages';
import styles from './App.module.sass';
const App = () => {

    return (
        <Router>
            <div className={styles.app}>
                <AppHeader/>
                <main className={styles.main}>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path="/characters/:id" element={<CharacterPage />} />
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;