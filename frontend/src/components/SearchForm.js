import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { useApolloClient, gql } from '@apollo/client'

import { AiOutlineSearch } from 'react-icons/ai'

const SEARCH_QUERY = gql`
    query SearchQuery ($search: String!) {
        products (search: $search) {
            id
            title
            rating
            inStock
            price {
                inclTax
                currency
            }
            images (take: 1) {
                id
                original
            }
        }
    }
`

const SearchForm  = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

    const client = useApolloClient()

    const history = useHistory()

    if (error) return <span>Error searching: {error}</span>

    return (
        <form 
          className='input-group' 
          onSubmit={e => {
            e.preventDefault()
            client.query({
                query: SEARCH_QUERY,
                variables: { search: searchTerm.trim() }
            })
              .then(({data}) => {
                  history.push({
                      pathname: '/search',
                      searchData: {
                        searchTerm: searchTerm,
                        results: data.products,
                        count: data.products.length
                      }
                  })
                  setSearchTerm('')
              })
              .catch(e => setError(e))
          }}
        >
            <input
              type='text' 
              value={searchTerm}
              onChange={({target}) => setSearchTerm(target.value)}
              placeholder="Buscar" 
              className='rounded' 
            />
            <button type='submit' className='btn btn-dark' disabled={searchTerm===''}>
                <AiOutlineSearch />
            </button>
        </form>
    )
}

export default SearchForm