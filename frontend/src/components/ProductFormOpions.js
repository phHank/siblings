import React from 'react'

const ProductFormOptions = ({options, notInStock, setError, models, setModels, sizes, setSizes}) => (
    options.map((option, i) => (
            <div key={option.id} className='d-flex justify-content-between w-75 mb-2'>
                <label htmlFor={option.code} className='font-weight-bold'>
                    {option.name.slice(0,21)}{option.required && '*'}:
                </label>

                <div>
                    <select 
                      id={option.code} 
                      disabled={notInStock}
                      onChange={e => {
                        setError('')
                        setModels(models.map((model, index) => i === index ? model=`${option.name};${e.target.value}` : model))
                      }}
                      defaultValue='disabled'
                    >
                        <option disabled value='disabled'>-</option>
                        <option>Niño</option>
                        <option>Mujer</option>
                        <option>Hombre</option>
                    </select>

                    <select 
                      id={option.code} 
                      onChange={e => {
                        setError('')
                        setSizes(sizes.map((size, index) => i === index ? size=e.target.value : size))
                      }}
                      defaultValue='disabled'
                      disabled={!models[i]}
                    >
                        <option disabled value='disabled'>-</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        {!models[i].includes('Niño') && <option>XL</option>}
                    </select>
                </div>
            </div>
        ))
)

export default ProductFormOptions