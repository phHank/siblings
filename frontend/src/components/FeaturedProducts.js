import React from 'react'

import { useQuery, gql } from '@apollo/client'

import ProductCol from './ProductCol'

export const GET_PRODUCTS_QUERY = gql`
query GetProductsQuery {
    products {
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

const FeaturedProducts = () => {
    const {data, loading, error} = useQuery(GET_PRODUCTS_QUERY)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error getting products: {error.message}</div>

    const { products } = data 

    return (
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
    )
}

export default FeaturedProducts