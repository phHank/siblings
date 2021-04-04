import React, { useState } from 'react'

import { useLazyQuery, gql } from '@apollo/client'

import { AiOutlineShoppingCart } from 'react-icons/ai'

import CartLines from './CartLines'

const GET_BASKET = gql`
query GetBasket {
    basket {
        id
        lines {
            id
            quantity
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
          className='position-absolute rounded bg-danger'
          style={{zIndex:1}}  
        >
            Error getting basket: {error} Refresh to try again.
        </div>
    )

    return (
        <div
          onClick={() => {
            getBasket() 
            setShow(!show)
          }} 
          onMouseLeave={() => setShow(false)}
          className='d-flex justify-content-end'
        >
            <AiOutlineShoppingCart size={40} color='#EFD604'/>
            {show && (
                <div 
                  className=' bg-secondary text-light border position-absolute rounded p-3 overflow-auto' 
                  style={{zIndex: 1}}
                >
                    {loading && 'Cargando...'}
                    {error && 'No hay nada en tu carrito.'}
                    {data && <CartLines lines={data.basket.lines} setShow={setShow} />}
                </div>
            )}
        </div>
    )
}

export default Cart