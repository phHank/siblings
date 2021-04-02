import React from 'react'

import { useLocation, Redirect } from 'react-router-dom'

import ProductCol from './ProductCol'
import SiblingsLogo from './SiblingsLogo'

const Search = () => {
    const { searchData } = useLocation()

    if (!searchData) return <Redirect to='/' />
    
    const {results, count, searchTerm} = searchData

    return (
        <>
            <div className='container p-1 d-flex flex-column align-items-center justify-content-center'>
                <SiblingsLogo height='10rem'/>
                <h3 className='text-secondary'>Found {count} {count === 1 ? 'result' : 'results'} for "{searchTerm}":</h3>
            </div>
            <div className='d-flex justify-content-center'style={{width: '125%'}}>
                <div className='row'>
                    {results.slice(0,4).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
                <div className='d-flex flex-row'>
                    {results.slice(4,8).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
                <div className='d-flex flex-row'>
                    {results.slice(8,12).map(product => <ProductCol key={product.id} product={product} />)}
                </div>
            </div>
        </>
    )
}

export default Search