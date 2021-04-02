import React from 'react'

import SiblingsLogo from './SiblingsLogo'

const NotFound = () => {
    return (
        <div className='container d-flex justify-content-center position-relative mt-5'>
            <SiblingsLogo height='30rem' />
            <div className='position-absolute'>
                <h4 className='text-dark' >
                    <span className='rounded p-1 font-weight-bold text-light' style={{backgroundColor: '#2E74B7'}}>404:</span> Página no encontrada
                </h4>
            </div>
        </div>

    )
}

export default NotFound