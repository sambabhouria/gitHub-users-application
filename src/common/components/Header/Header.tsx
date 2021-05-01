import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

interface HProps {
    withBackLink?: boolean
}

export const Header: React.FC<HProps> = ({ withBackLink = false }) => {
    return (
        <header className={styles.header}>
            {withBackLink && (
                <div className={styles.back}>
                    <Link to="/">Back</Link>
                </div>
            )}
            <div className={styles.logoBox}>
                <i className={styles.git} />
                <h1>GitHub Users</h1>
            </div>
        </header>
    )
}
