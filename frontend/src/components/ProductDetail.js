import React from 'react'

import { useHistory } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

import parser from 'html-react-parser'

import ImageCarousel from './ImageCarousel'
import DeliveryGuide from './DeliveryGuide'
import ProductSelectForm from './ProductSelectForm'
import ProductCol from './ProductCol'

export const GET_PRODUCT_QUERY = gql`
query GetProductQuery ($id: Int!) {
    product (id: $id) {
        id
        title
        description
        inStock
        categories {
            category {
                name
            }
        }
        price {
            inclTax
            currency
        }
        images (skip: 1) {
            original
            caption
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
            price {
                inclTax
                currency
            }
        }
    }
}
`

const ProductDetail = () => {
    const history = useHistory()

    const [,,productId] = history.location.pathname.split('/')

    const {data, loading, error } = useQuery(GET_PRODUCT_QUERY, {
        variables: {id: productId}
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error getting product info: {error.message}</div>
 
    const {product} = data

    const includesAdultItem = product.categories.some(({category}) => (
        category.name.toLowerCase().includes('mamá')
        || category.name.toLowerCase().includes('papá')
    ))
    
    const multiBuy = [,, 'por par', 'por tres', 'por cuatro']

    return (
        <div>
            <div className='row'>
            
                <div className='w-50 mr-3 mt-5 col'>
                    <ImageCarousel images={product?.images} />
                </div>
                
                <div className='col-sm mt-5'>

                    <h2 className='display-4'>{product.title}</h2>
                    
                    <DeliveryGuide />

                    <h4 className='my-3'>
                        {product.price.currency !== 'EUR' ? product.price.currency + ' $' : '€'}{product.price.inclTax}
                        <small> {multiBuy[product.options.length]}</small>
                    </h4>

                    <ProductSelectForm 
                      notInStock={product.inStock < 0} 
                      product={product} 
                      includesAdult={includesAdultItem}
                    />

                    {parser(product.description)}

                </div>
            </div>

            {product.recommendedProducts.length > 0 && (
                <div className='mt-5'>
                    <h6>Otros productos que te pueden interesar:</h6>
                    <div className='row'>
                        {product?.recommendedProducts.slice(0,3).map(product => <ProductCol key={product.id} product={product} />)}
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductDetail