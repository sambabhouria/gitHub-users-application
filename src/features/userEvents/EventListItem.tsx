import moment from 'moment'
import React from 'react'
import { Event, User } from 'app/types'
import AvatarImage, { SelectableTypes } from 'common/components/AvatarImage'

import styles from './EventListItem.module.scss'

interface ELIProps {
    event: Event
    user: User
}

export const EventListItem = ({ event, user }: ELIProps) => {
    const { repo, action, date, urlPR } = event

    return (
        <div className={styles.item}>
            <p className={styles.date}>{moment(new Date(date)).format('MMM DD, YYYY')}</p>

            <div className={styles.body}>
                <AvatarImage src={user.avatarUrl} alt={user.login} type={SelectableTypes.Timeline} />
                <div>
                    <p>
                        @{user.login} {action} <a href={urlPR}>PR</a>
                    </p>
                    <p>{repo.name}</p>
                </div>
            </div>
        </div>
    )
}
