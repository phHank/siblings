import React from 'react'

import { Link } from 'react-router-dom'

const CartLines = ({lines}) => (
    <div 
      className='w-100 h-100 d-flex flex-column'>
        <a href='http://localhost:8000/order/basket/' className='align-self-end'>
            <button className='btn btn-dark'>Checkout</button>
        </a>
        <div className='border border-light w-100 my-3'/>
        <table>
            <thead>
                <tr>
                    <th>Artículo</th>
                    <th className='text-center'>Cantidad</th>
                    <th className='text-right'>$</th>
                </tr>
            </thead>
            <tbody>
                {lines.map(line => (
                    <tr key={line.id} className='boder-bottom'>
                        <td>
                            <Link 
                                to={`/products/${line.product.id}`}
                                style={{textDecoration: 'none', color: '#FFF'}}
                                className='font-weigth-bold'
                            >
                                {line.product.title}
                            </Link>
                        </td>
                        <td className='text-center'>{line.quantity}</td>
                        <td className='text-right'>{line.quantity * line.priceInclTax}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan='3' className='text-center pt-3 text-dark'><small>Las tallas aparecerán en el Checkout</small></td>
                </tr>
            </tfoot>
        </table>
        
    </div>
)

export default CartLines