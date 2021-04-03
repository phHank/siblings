import React, { useState } from 'react'

import { useMutation, gql } from '@apollo/client'

import SizeGuide from './SizeGuide'
import ProductFormOptions from './ProductFormOpions'

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION (
    $productId: Int!
    $size1: String!
    $size2: String!
  ){
    addKidProduct(productId: $productId size1: $size1 size2: $size2) {
      basket {
        id
        lines {
          quantity
          product {
            id
            title
          }
        }
      }    
    }
  }
`

const ProductSelectForm = ({notInStock, product}) => {
    const [formData, setFormData] = useState({
        leftSize: null,
        rightSize: null
    })
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleChange = (key, value) => {
      setFormData({
        ...formData,
        [key]: value
      })
    }
    
    const [addItem, {loading}] = useMutation(ADD_ITEM_MUTATION, {
      variables: {
        productId: product.id,
        size1: formData.leftSize,
        size2: formData.rightSize
      },
      onCompleted: () => {
        if (redirect) window.location = 'http://localhost:8000/order/basket/'
    },
      onError: e => setError(e.message)
    })

    const handleAddItem = redirectBool => {
      if (!(formData.leftSize && formData.rightSize)) {
        setError('Por favor seleccione talla por playera.')
        return
      }
      setRedirect(redirectBool)
      addItem()
      // TODO: if !redirect then show appropriate success message and options: go to cart or browse other products
    }

    return (
        <form className='m-5' onSubmit={e => e.preventDefault()}>

          <SizeGuide />

          {error && <p className='bg-danger m-2 rounded p-2 text-center'>Error: {error}</p>}
          <ProductFormOptions 
            options={product.options}
            handleChange={handleChange}
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