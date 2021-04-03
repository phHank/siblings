import React, { useState } from 'react'

import { useLazyQuery, gql } from '@apollo/client'

import { AiOutlineShoppingCart } from 'react-icons/ai'

const GET_BASKET = gql`
query GetBasket {
    basket {
        id
        lines {
            quantity
            priceCurrency
            priceInclTax
            product {
                id
                title
            }
        }
    }
}
`

const Cart = () => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)

    const [getBasket, { data, loading }] = useLazyQuery(GET_BASKET, {
        onError: error => setError(error.message),
        fetchPolicy: 'network-only'
    })

    if (error && error !== 'Empty Basket') return (
        <div 
          className='position-absolute w-25 rounded bg-danger'
          style={{zIndex:1}}  
        >
            Error getting basket: {error} Refresh to try again.
        </div>
    )

    return (
        <div
          onClick={() => {
            getBasket() 
            setShow(true)
          }} 
          onMouseLeave={() => setShow(false)}
          className='d-flex justify-content-end'
        >
            <AiOutlineShoppingCart size={40} color='#EFD604'/>
            {show && (
                <div 
                  className='bg-secondary text-light border position-absolute w-25 rounded p-3 overflow-auto' 
                  style={{zIndex: 1}}
                >
                    {loading && 'Cargando...'}
                    {error && 'No hay nada en tu carrito.'}
                    {data && JSON.stringify(data)}
                </div>
            )}
        </div>
    )
}

export default Cart