import React from 'react'

const ProductFormOptions = ({options, notInStock, setError, formData, setFormData}) => (
    options.map((option, i) => (
            <div key={option.id} className='d-flex justify-content-between w-50 mb-2'>
                <label htmlFor={option.code} className='font-weight-bold'>
                    {option.name}{option.required && '*'}:
                </label>
                <select 
                id={option.code} 
                disabled={notInStock}
                onChange={e => {
                    setError('')
                    setFormData(formData.map((size, index) => i === index ? size=e.target.value : size))
                }}
                defaultValue='disabled'
                >
                    <option disabled value='disabled'>-</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                </select>
            </div>
        ))
)

export default ProductFormOptions