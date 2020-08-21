import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from 'app/store'

import './index.scss'

const render = () => {
    const App = require('./app/App').default

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <Router basename={process.env.PUBLIC_URL}>
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', render)
}
