import React from 'react'

import { Link } from 'react-router-dom'

const ProductCol = ({product}) => (
    <Link 
      to={`/products/${product.id}`} 
      className='col-sm m-2'
      style={{textDecoration: 'none', color: '#000'}}
      disabled
    >
        <figure className='d-flex flex-column align-items-center'>
            <img src={'http://localhost:8000/media/' + product.images[0].original} />
            <figcaption>
                <small className='text-light font-weight-bold rounded p-3' style={{backgroundColor: '#2E74B7'}}>
                    {product.title} - {product.price.currency !== 'EUR' ? product.price.currency + ' $' : '€'} {product.price.inclTax}
                </small>
            </figcaption>
            <figcaption><small>{product.rating}</small></figcaption>
        </figure>
    </Link>
)

export default ProductCol