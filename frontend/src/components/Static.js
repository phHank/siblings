import React from 'react'

import { useHistory } from 'react-router-dom'

import {
    privacidad,
    terminos,
    contacto,
    nosotros
} from '../static/staticsPages'

const Static = () => {
    const history = useHistory()

    const [,,path] = history.location.pathname.split('/')

    const options = {
        privacidad,
        terminos,
        contacto,
        nosotros
    }

    return (
        <div className='p-5'>
            {options[path]}
        </div>
    )
}

export default Static