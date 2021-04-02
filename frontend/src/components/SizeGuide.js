import React, { useState } from 'react'

import { AiFillInfoCircle } from 'react-icons/ai'

const SizeGuide = () => {
    const [showGuide, setShowGuide] = useState(false)

    return (
        <div
          className='text-dark'
          style={{cursor: 'help'}}
          onMouseOver={() => setShowGuide(true)}
          onMouseOut={() => setShowGuide(false)}
        >
            <small>Size Guide <AiFillInfoCircle color='#EFD604' /></small>
            {showGuide && (
            <div 
              className='border rounded w-75 p-2 m-2 position-absolute bg-light'
              style={{zIndex: 1}}
            >
                Modelo disponible en talla:
                <br/>- Small 2-4 años (32 ancho x 46 largo) 
                <br/>- Medium 6-8 años (36 ancho x 48 largo) 
                <br/>- Large 10-12 años (40 ancho x 52 largo).
            </div>)}
        </div>
    )
}

export default SizeGuide