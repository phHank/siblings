import React, { useState } from 'react'

import { AiFillInfoCircle } from 'react-icons/ai'

const SizeGuide = () => {
    const [showGuide, setShowGuide] = useState(false)

    return (
        <div
          className='text-dark w-50'
          style={{cursor: 'help'}}
          onMouseOver={() => setShowGuide(true)}
          onMouseOut={() => setShowGuide(false)}
        >
            <small className='font-weight-bold '>
              Guía de tallas <AiFillInfoCircle color='#EFD604' size={25}/>
            </small>
            {showGuide && (
            <div 
              className='border rounded w-75 p-2 m-2 position-absolute bg-light'
              style={{zIndex: 1}}
            >
                <span className='h-6 font-weight-bold'>Tallas Niños:</span>
                <br/>- Small 2-4 años (32 ancho x 46 largo) 
                <br/>- Medium 6-8 años (36 ancho x 48 largo) 
                <br/>- Large 10-12 años (40 ancho x 52 largo)
                <br/>
                <br/>
                <span className='h-6 font-weight-bold'>Tallas Mujeres:</span>
                <br/>- Small (44 ancho x 55 largo) 
                <br/>- Medium (46 ancho x 56 largo) 
                <br/>- Large (48 ancho x 57 largo)
                <br/>- XLarge (50 ancho x 59 largo)
                <br/>
                <br/>
                <span className='h-6 font-weight-bold'>Tallas Hombres:</span>
                <br/>- Small (48 ancho x 62 largo) 
                <br/>- Medium (50 ancho x 63 largo) 
                <br/>- Large (52 ancho x 64 largo)
                <br/>- XLarge (54 ancho x 66 largo)
                <br/>
                <br/>
                <div>
                  <small className='text-muted'>Las medidas son en centímetros</small>
                </div>
            </div>)}
        </div>
    )
}

export default SizeGuide