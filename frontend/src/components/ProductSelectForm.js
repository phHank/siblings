import React, { useState } from 'react'

import { useMutation, gql } from '@apollo/client'

import Thank from './Thank'
import SizeGuide from './SizeGuide'
import ProductOptionsAdult from './ProductOptionsAdult'
import ProductFormOptions from './ProductFormOpions'

import { AiFillCreditCard } from 'react-icons/ai'

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION (
    $productId: Int!
    $size1: String!
    $size2: String!
    $size3: String
    $size4: String
  ){
    addProduct(
      productId: $productId 
      size1: $size1 
      size2: $size2 
      size3: $size3 
      size4: $size4
      ) {
      basket {
        id
      }
    }
  }
`

const ProductSelectForm = ({notInStock, product, isPair}) => {
    const [models, setModels] = useState(['', '', '', ''])
    const [sizes, setSizes] = useState([null, null, null, null])
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [thanks, setThanks] = useState(false)
    
    const [addItem, {loading}] = useMutation(ADD_ITEM_MUTATION, {
      variables: {
        productId: product.id,
        size1: models[0] ? models[0] + ' ' + sizes[0] : 'Adulto;Adulto' + ' ' + sizes[0],
        size2: models[1] + ' ' + sizes[1],
        size3: sizes[2] ? models[2] + ' ' + sizes[2] : null,
        size4: sizes[3] ? models[3] + ' ' + sizes[3] : null,
      },
      onCompleted: () => {
        redirect 
        ? window.location = '/order/basket/'
        : setThanks(true)
    },
      onError: e => setError(e.message)
    })

    const handleAddItem = redirectBool => {
      if (sizes.filter(size => size).length < product.options.length) {
        setError('Por favor seleccione talla por playera.')
        return
      }
      setRedirect(redirectBool)
      addItem()
    }

    if (thanks) return <Thank />

    return (
        <form className='m-5' onSubmit={e => e.preventDefault()}>
          <SizeGuide />

          {error && <p className='bg-danger m-2 rounded p-2 text-center'>Error: {error}</p>}
          {isPair
            ? <ProductFormOptions 
                options={product.options}
                models={models}
                setModels={setModels}
                sizes={sizes}
                setSizes={setSizes}
                setError={setError} 
                notInStock={notInStock} 
              />
            : <ProductOptionsAdult 
                options={product.options}
                models={models}
                setModels={setModels}
                sizes={sizes}
                setSizes={setSizes}
                setError={setError} 
                notInStock={notInStock} 
              />
          }
          
          <button 
            className='btn btn-block w-75 font-weight-bold text-light' 
            disabled={notInStock || loading}
            style={{backgroundColor: '#9A5ACB'}}
            onClick={() => handleAddItem(true)}
          >
            Comprar
          </button>
          
          <button 
            className='btn btn-block w-75 font-weight-bold text-light' 
            disabled={notInStock || loading}
            style={{backgroundColor: '#4D2D66'}}
            onClick={() => handleAddItem(false)}
          >
            Agregar a bolsa de compra
          </button>

          <small className='text-muted'>
            ??M??s playeras? Escr??benos a siblingstms@gmail.com
          </small>

          <p className='text-right mt-5'>
              <small>
                <AiFillCreditCard size={30}/> Pagos con tarjeta de cr??dito, d??bito, y American Express
              </small>
          </p>
        </form>
    )
}

export default ProductSelectForm