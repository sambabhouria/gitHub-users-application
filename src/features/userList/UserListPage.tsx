import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { ErrorBox, Spinner } from 'common/components'
import useDocumentTitle from 'common/hooks/useDocumentTitle'
import useInfiniteScroll from 'common/hooks/useInfiniteScroll'

import { UserListItem } from './UserListItem'
import styles from './UserListPage.module.scss'
import { getUsersStart } from './usersSlice'

export const UserListPage: React.FC = () => {
    const { visibleUsers, loading, error: usersError, isLastPage } = useSelector((state: RootState) => state.users)

    const bottomBoundaryRef = useRef(null)

    useDocumentTitle()

    useInfiniteScroll(bottomBoundaryRef, getUsersStart)

    const list = (
        <div className={styles.list}>
            {visibleUsers.map((login) => (
                <UserListItem key={login} login={login} />
            ))}
        </div>
    )

    return (
        <>
            {list}
            {loading && <Spinner />}
            {usersError && <ErrorBox message={usersError} />}
            {!isLastPage && <div ref={bottomBoundaryRef} />}
        </>
    )
}
