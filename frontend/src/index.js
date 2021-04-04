import React from 'react'
import ReactDOM from 'react-dom'

import { 
    ApolloClient, 
    InMemoryCache,
    ApolloProvider
} from '@apollo/client'

const getCSRF = () => {
    const cookies = document.cookie.split(';')
    const [csrfToken] = cookies.filter(cookie => cookie.includes('csrftoken='))
    return csrfToken.slice(10,)
}

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    cache: new InMemoryCache(),
    credentials: 'same-origin',
    headers: {
        'X-CSRFTOKEN': getCSRF()
    }
})

import App from './components/App'

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)