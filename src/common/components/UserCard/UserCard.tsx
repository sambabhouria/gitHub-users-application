import classnames from 'classnames'
import React from 'react'

import AvatarImage, { SelectableTypes } from '../AvatarImage'

import styles from './UserCard.module.scss'

interface UCProps {
    user: {
        name?: string | null
        login: string
        id: number
        avatarUrl: string
    }
    lg?: boolean
}

export const UserCard = ({ user, lg = false }: UCProps) => {
    const { id, login, avatarUrl, name } = user

    return (
        <div className={classnames('card', styles.body, { [styles.lg]: lg })}>
            <AvatarImage src={avatarUrl} alt={login} type={lg ? SelectableTypes.Profile : SelectableTypes.List} />

            <div className={styles.info}>
                {name && <h3 className={styles.name}>{name}</h3>}
                <h4 className={styles.login}>@{login}</h4>

                <div>
                    <span>ID: #{id}</span>
                </div>

                <a href={`https://github.com/${login}`} className={styles.gitLink}>
                    <i className={styles.git} />
                    GitHub Page
                </a>
            </div>
        </div>
    )
}
