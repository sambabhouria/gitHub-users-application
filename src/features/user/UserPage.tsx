import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { Spinner, UserCard } from 'common/components'
import useDocumentTitle from 'common/hooks/useDocumentTitle'
import ErrorPage from 'features/error/ErrorPage'
import { EventList } from 'features/userEvents/EventList'
import { RepoList } from 'features/userRepos/RepoList'

import styles from './UserPage.module.scss'
import { getUserDetailsStart } from './userDetailsSlice'

export const UserPage: React.FC = () => {
    const { login } = useParams()

    console.log('login', login)
    const dispatch = useDispatch()

    const { detailsByUser, error: userError, loading } = useSelector((state: RootState) => state.userDetails)
    const user = detailsByUser[login.toLowerCase()]

    useDocumentTitle(user && user.login)

    useEffect(() => {
        if (!user) {
            dispatch(getUserDetailsStart({ login }))
        }
        window.scrollTo({ top: 0 })
    }, [login, user, dispatch])

    if (userError) {
        return <ErrorPage />
    }

    if (loading || !user) {
        return <Spinner />
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div>
                    <h2>Profile</h2>
                    <UserCard user={user} lg />
                    <h2 className={styles.mtop}>Repositories</h2>
                    <RepoList user={user} />
                </div>
            </div>

            <div className={styles.section}>
                <h2>History of PR</h2>
                <EventList user={user} />
            </div>
        </div>
    )
}

export default UserPage
