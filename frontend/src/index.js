import React from 'react'
import ReactDOM from 'react-dom'

import { 
    ApolloClient, 
    InMemoryCache,
    ApolloProvider
} from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    cache: new InMemoryCache()
})

import App from './components/App'

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)