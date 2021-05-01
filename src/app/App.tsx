import React, { Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { UserListPage } from 'features/userList/UserListPage'

import { Header, Spinner } from 'common/components'

import './App.scss'

const UserPage = React.lazy(async () => {
    return import('features/user/UserPage')
})

const ErrorPage = React.lazy(async () => {
    return import('features/error/ErrorPage')
})

const App: React.FC = () => {
    const location = useLocation()

    const withBackLink = location.pathname.split('/')[1] === 'user'
    console.log('🚀 ~ file: App.tsx ~ line 21 ~ withBackLink', withBackLink)

    return (
        <>
            <Header withBackLink={withBackLink} />
            <main>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route path="/user/:login" exact component={UserPage} />
                        <Route path="/" exact component={UserListPage} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Suspense>
            </main>
        </>
    )
}

export default App
