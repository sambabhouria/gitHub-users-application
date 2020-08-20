import React from 'react'

import styles from './ErrorBox.module.scss'

interface EAProps {
    message: string
}

export const ErrorBox = ({ message }: EAProps) => {
    return (
        <div className={styles.error}>
            <p>{message}</p>
        </div>
    )
}
