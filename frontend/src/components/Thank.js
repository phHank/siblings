import React from 'react'

import { Link } from 'react-router-dom'

const Thanks = () => (
    <div 
      className='w-75 position-absolute' 
      style={{height: '40%', zIndex: 5, backgroundColor: '#FFF'}}
    >
        <h5 className='text-center'>Artículo agregado al carrito</h5>
        <div className='d-flex flex-row justify-content-around'>
            <Link to='/category/all' className='btn btn-info'>
                Seguir comprando
            </Link>
            <a href='/order/basket/' className='btn btn-primary'>
                Visita tu carrito
            </a>
        </div>
    </div>
)

export default Thanks