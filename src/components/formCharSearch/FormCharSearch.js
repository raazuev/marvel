import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import styles from './FormCharSearch.module.sass';

const FormCharSearch = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getSearchChar, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        
        getSearchChar(name)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <div className={styles.ErrorMessage}><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className={styles.searchWrapper}>
                        <div className={styles.visit}>There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`}>
                            <button className={styles.btn}>To page</button>
                        </Link>
                    </div> : 
                    <div className={styles.seacrhError}>
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className={styles.inner}>
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label htmlFor="charName">Or find a character by name:</label>
                    <div className={styles.form}>
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            disabled={loading}>
                            Find
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className={styles.seacrhError} name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default FormCharSearch;