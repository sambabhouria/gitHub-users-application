import React from 'react'
import { Link } from 'react-router-dom'

import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
    return (
        <div className={styles.boxContainer}>
            <div className={styles.message}> Page is not found </div>
            <div className={styles.footer}>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default ErrorPage
