import React from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

import SiblingsLogo from './SiblingsLogo'
import NavDropDown from './NavDropDown'
import SearchForm from './SearchForm'
import Cart from './Cart'

import { RiAccountCircleLine } from 'react-icons/ri'

export const GET_CATEGORIES = gql`
query GetCategoies {
    categories {
        id
        name 
    }
    loggedIn
}
`

const aStyle={color: '#FFF', textDecoration: 'none'}

const NavigationBar = () => {
    const {data, loading, error } = useQuery(GET_CATEGORIES)

    return (
        <nav 
        className='navbar w-100' 
        style={{backgroundColor: '#2E74B7'}} 
      >
            
            <div className='d-flex align-items-center'>
                <NavLink to='/' className='navbar-brand mr-2'>
                    <SiblingsLogo height='2.25rem' />
                </NavLink>
                <NavDropDown 
                  aStyle={aStyle} 
                  categories={data?.categories} 
                  error={error} 
                  loading={loading} 
                />
                <NavLink to='/info/contacto' className='pr-2' style={aStyle}>
                    Contacto
                </NavLink>
                <NavLink to='/info/nosotros' className='px-2' style={aStyle}>
                    Nuestra Historia
                </NavLink>
                <a 
                  href={`http://localhost:8000/order/accounts/${data?.loggedIn ? '' : 'login/'}`} 
                  stlye='px-2 nav-link'
                >
                    <RiAccountCircleLine size={40} color='#EFD604' />
                </a>
            </div>
            
            <div className='d-flex align-items-center'>
                <div className='p-2'>
                    <SearchForm />
                </div>
                <Cart /> 
            </div>
            
        </nav>
    )
}


export default NavigationBar