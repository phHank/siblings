import React from 'react'
import { NavLink } from 'react-router-dom'

import SiblingsLogo from './SiblingsLogo'
import NavDropDown from './NavDropDown'
import SearchForm from './SearchForm'
import Cart from './Cart'

const aStyle={color: '#FFF', textDecoration: 'none'}

const NavigationBar = () => (
    <nav 
      className='navbar w-100' 
      style={{backgroundColor: '#2E74B7'}} >
        
        <div className='d-flex align-items-center'>
            <NavLink to='/' className='navbar-brand mr-2'>
                <SiblingsLogo height='2.25rem' />
            </NavLink>
            <NavDropDown aStyle={aStyle}/>
            <NavLink to='/offerta' className='px-2' style={aStyle}>Ofertas</NavLink>
        </div>
        
        <div className='row pr-2'>
            <Cart /> 
            <div className='pl-2'>
                <SearchForm />
            </div>
        </div>
        
    </nav>
)


export default NavigationBar