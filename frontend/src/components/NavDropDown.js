import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

import { AiOutlineCloseCircle } from 'react-icons/ai'

export const GET_CATEGORIES = gql`
query GetCategoies {
    categories {
        id
        name 
    }
}
`

const NavDropDown = ({aStyle}) => {
    const [show, setShow] = useState(false)

    const history = useHistory()

    const {data, loading, error } = useQuery(GET_CATEGORIES)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    const { categories } = data

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