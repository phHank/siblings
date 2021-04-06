import React, { useState } from 'react'

import { useMutation, gql } from '@apollo/client'

import Thank from './Thank'
import SizeGuide from './SizeGuide'
import ProductFormOptions from './ProductFormOpions'

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION (
    $productId: Int!
    $size1: String!
    $size2: String!
    $size3: String
  ){
    addProduct(productId: $productId size1: $size1 size2: $size2 size3: $size3) {
      basket {
        id
      }
    }
  }
`

const ProductSelectForm = ({notInStock, product}) => {
    const [formData, setFormData] = useState([null, null, null])
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [thanks, setThanks] = useState(false)
    
    const [addItem, {loading}] = useMutation(ADD_ITEM_MUTATION, {
      variables: {
        productId: product.id,
        size1: formData[0],
        size2: formData[1],
        size3: formData[2]
      },
      onCompleted: () => {
        redirect 
        ? window.location = '/order/basket/'
        : setThanks(true)
    },
      onError: e => setError(e.message)
    })

    const handleAddItem = redirectBool => {
      if (formData.filter(size => size).length < product.options.length) {
        setError('Por favor seleccione talla por playera.')
        return
      }
      setRedirect(redirectBool)
      addItem()
    }

    return (
        <form className='m-5' onSubmit={e => e.preventDefault()}>
          {thanks && <Thank />}

          <SizeGuide />

          {error && <p className='bg-danger m-2 rounded p-2 text-center'>Error: {error}</p>}
          <ProductFormOptions 
            options={product.options}
            formData={formData}
            setFormData={setFormData}
            setError={setError} 
            notInStock={notInStock} 
          />

          <button 
            className='btn btn-block w-75 font-weight-bold' 
            disabled={notInStock || loading}
            style={{backgroundColor: '#95D3E9'}}
            onClick={() => handleAddItem(true)}
          >
            Comprar
          </button>
          
          <button 
            className='btn btn-block w-75 font-weight-bold' 
            disabled={notInStock || loading}
            style={{backgroundColor: '#2E74B7'}}
            onClick={() => handleAddItem(false)}
          >
            Agregar a bolsa de compra
          </button>

          <small className='text-muted'>
            ¿Tallas para adultos? Escríbenos a siblingstms@gmail.com
          </small>

        </form>
    )
}

export default ProductSelectForm