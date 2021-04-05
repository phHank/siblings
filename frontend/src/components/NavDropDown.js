import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { AiOutlineCloseCircle } from 'react-icons/ai'


const NavDropDown = ({aStyle, categories, loading, error}) => {
    const [show, setShow] = useState(false)

    const history = useHistory()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="nav-item dropdown px-2">
            <div 
              className="nav-link dropdown-toggle" 
              style={aStyle}
              onClick={() => setShow(!show)}
            >
                Categorías
            </div>
            {show && (
                <>
                    <AiOutlineCloseCircle color='#FF6961' onClick={() => setShow(false)} className='d-md-block d-lg-none position-relative' />
                    <select
                      className='form-select form-select-sm position-absolute overflow-hidden w-75 rounded'
                      multiple
                      onChange={(e) => {
                        history.push(`/category/${e.target.value}`)
                        setShow(false)
                      }}
                      onMouseLeave={() => setShow(false)}
                      style={{zIndex: 1}}
                      size={categories.length + 1}
                    >
                        <option 
                          className='font-weight-bold border-bottom text-center'
                          value={'all'}
                        >
                            Todas
                        </option>
                        {categories.map(cat => (
                            <option
                              className='text-center'
                              key={cat.id}
                              value={cat.name}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    )
}

export default NavDropDown