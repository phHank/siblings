import React from 'react'

import { useHistory } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

import parser from 'html-react-parser'

import DeliveryGuide from './DeliveryGuide'
import ProductSelectForm from './ProductSelectForm'
import ProductCol from './ProductCol'

export const GET_PRODUCT_QUERY = gql`
query GetProductQuery ($id: Int!) {
    product (id: $id) {
        id
        title
        description
        rating
        inStock
        price {
            inclTax
            currency
        }
        images {
            id
            original
        }
        options {
            id
            name
            code
            required
        }
        recommendedProducts {
            id
            title
            images (take: 1) {
                original
            }
        }
    }
}
`

const ProductDetail = () => {
    const history = useHistory()

    const path = history.location.pathname.split('/')
    const productId = path[path.length -1]

    const {data, loading, error } = useQuery(GET_PRODUCT_QUERY, {
        variables: {id: productId}
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>There has been a murder!</div>
 
    const {product} = data

    return (
        <div>
            <div className='row'>
                
                <img
                  className='col-sm' 
                  style={{maxHeight: 560}}
                  src={'http://localhost:8000/media/' + product.images[0].original} 
                />
                
                <div className='col-sm mt-5'>

                    <h2 className='display-4'>{product.title}</h2>
                    
                    <DeliveryGuide />

                    <h4 className='my-3'>
                        {product.price.currency !== 'EUR' ? product.price.currency + ' $' : '€'}{product.price.inclTax}
                    </h4>

                    <p className='text-center'>{product.rating}</p>
                    
                    <ProductSelectForm notInStock={product.inStock < 0} product={product} />

                    {parser(product.description.replace(/r*fafafa*/ig, '#FFF'))}

                </div>
            </div>

            {product.recommendedProducts.length > 0 && (
                <>
                    <h5>Otros productos que te pueden interesar:</h5>
                    <div className='row'>
                        {product?.recommendedProducts.slice(0,3).map(product => <ProductCol key={product.id} product={product} />)}
                    </div>
                </>
            )}

        </div>
    )
}

export default ProductDetail