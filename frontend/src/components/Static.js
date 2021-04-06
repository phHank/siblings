import React from 'react'

import { useHistory } from 'react-router-dom'

import {
    privacidad,
    terminos,
    contacto,
    nosotros
} from '../static/staticsPages'

import SiblingsLogo from './SiblingsLogo'

const Static = () => {
    const history = useHistory()

    const [,,path] = history.location.pathname.split('/')

    const options = {
        privacidad,
        terminos,
        contacto,
        nosotros
    }

    const showLogo = ['nosotros', 'contacto']

    return (
        <div className='p-5'>
            {showLogo.includes(path) && (
                <div className='w-100 d-flex justify-content-center'>
                    <SiblingsLogo height={'10rem'} />
                </div>
            )}
            {options[path]}
        </div>
    )
}

export default Static