import React from 'react'

import FeaturedProducts from './FeaturedProducts'
import SiblingsLogo from './SiblingsLogo'

const Home = () => {
    return (
        <div className="container d-flex flex-column align-items-center">
            <SiblingsLogo height='30rem' />
            <FeaturedProducts />
        </div>
    )
}


export default Home