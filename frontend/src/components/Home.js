import React from 'react'

import { useLocation, Redirect } from 'react-router-dom'

import FeaturedProducts from './FeaturedProducts'
import SiblingsLogo from './SiblingsLogo'

const Home = () => {
    const {search:urlQuery} = useLocation()

    if (urlQuery) {
        const [name, param] = urlQuery.slice(1,urlQuery.length).split('=')
        
        return <Redirect to={!param 
            ? `/${name}`
            : `/${name}/${param}`
        } />
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <SiblingsLogo height='30rem' />
            <FeaturedProducts />
        </div>
    )
}


export default Home