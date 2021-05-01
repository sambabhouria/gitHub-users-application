import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REPOS_PER_PAGE } from 'app/config'
import { RootState } from 'app/rootReducer'
import { UserDetails } from 'app/types'
import { ButtonLink, ErrorBox, Spinner } from 'common/components'

import styles from './RepoList.module.scss'
import { getReposStart } from './userReposSlice'

interface URLProps {
    user: UserDetails
}

export const RepoList = ({ user }: URLProps) => {
    const { login, publicRepos: reposCount } = user

    const dispatch = useDispatch()

    const { loading, error: reposError, reposByUser } = useSelector((state: RootState) => state.userRepos)

    const repos = reposByUser[user.login.toLowerCase()]

    useEffect(() => {
        if (!repos) {
            dispatch(getReposStart({ login, page: 0 }))
        }
    }, [repos, login, dispatch])

    const onLoadMoreHandler = () => {
        if (repos) {
            const currentPage = Math.floor(repos.length / REPOS_PER_PAGE)
            dispatch(getReposStart({ login, page: currentPage + 1 }))
        }
    }

    let content

    if (reposError) {
        content = <ErrorBox message={reposError} />
    }

    if (repos) {
        content = repos.length ? (
            <>
                <ul>
                    {repos.map((repo) => (
                        <li key={repo.id}>{repo.name}</li>
                    ))}
                </ul>
                {reposCount > repos.length && !loading && (
                    <ButtonLink onClick={onLoadMoreHandler}>Load more</ButtonLink>
                )}
            </>
        ) : (
            <div>No pubic repos.</div>
        )
    }

    return (
        <div className={styles.repos}>
            <p>
                <b>Repositories count: </b> <span data-testid="repoCnt">{reposCount}</span>
            </p>
            <p>
                <b>Repositories list:</b>
            </p>
            {content}
            {loading && <Spinner />}
        </div>
    )
}
