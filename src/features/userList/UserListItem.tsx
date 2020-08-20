import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { UserCard } from 'common/components'

import styles from './UserListItem.module.scss'

interface ULIProps {
    login: string
}

export const UserListItem = React.memo(({ login }: ULIProps) => {
    const { usersByLogin } = useSelector((state: RootState) => state.users)

    const user = usersByLogin[login]

    if (!user) {
        return <></>
    }

    return (
        <div className={styles.item}>
            <UserCard user={user} />
            <div className={styles.footer}>
                <Link to={`/user/${login}`}>Details</Link>
            </div>
        </div>
    )
})
