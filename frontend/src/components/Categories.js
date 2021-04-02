import React from 'react'

import { useHistory } from 'react-router-dom' 

import { useQuery, gql } from '@apollo/client'
import { GET_PRODUCTS_QUERY } from './FeaturedProducts'

import ProductCol from './ProductCol'
import SiblingsLogo from './SiblingsLogo'

const GET_PRODUCTS_BY_CAT = gql`
query GetProductsByCat ($name: String!) {
    category (name: $name) {
        id
        name
        productSet {
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
}
`

const Categories = () => {
    const history = useHistory()
    const path = history.location.pathname.split('/')
    const name = path[path.length -1]

    const target = {
        all: GET_PRODUCTS_QUERY,
        notAll: GET_PRODUCTS_BY_CAT
    }

    const ifAll = name === 'all'

    const { data, loading, error } = useQuery(target[ifAll ? 'all' : 'notAll'], {
        variables: {name}
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const products = ifAll ? data.products : data.category.productSet 

    return (
        <div className='container d-flex flex-column align-items-center'>
            <div className='d-flex flex-row align-items-center p-5'>
                <SiblingsLogo height='5rem' />
                <h2 className='display-4 ml-3'>Categoría: {ifAll ? 'Todo' : data.category.name}</h2>
            </div>


            <div style={{width: '125%'}}>
                <div className='row'>
                    {products?.slice(0,4).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
                <div className='d-flex flex-row'>
                    {products?.slice(4,8).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
                <div className='d-flex flex-row'>
                    {products?.slice(8,12).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
            </div>
           
        </div>
        
    )
}

export default Categories