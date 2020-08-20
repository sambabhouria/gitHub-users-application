import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { UserListPage } from 'features/userList/UserListPage'

const UserPage = React.lazy(() => {
    return import('features/user/UserPage')
})

const ErrorPage = React.lazy(() => {
    return import('features/error/ErrorPage')
})


export const Routes = (props) => (
    <Switch>
        <Route path="/user/:login" exact component={UserPage} />
        <Route path="/" exact component={UserListPage} />
        <Route component={ErrorPage} />
    </Switch>
)
