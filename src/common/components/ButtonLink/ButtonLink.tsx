import React from 'react'

import classnames from 'classnames'

import styles from './ButtonLink.module.scss'

interface BProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
}

export const ButtonLink: React.FC<BProps> = ({ onClick, className, children, ...rest }) => {
    return (
        <button {...rest} className={classnames(styles.btn, className)} onClick={onClick}>
            {children}
        </button>
    )
}
