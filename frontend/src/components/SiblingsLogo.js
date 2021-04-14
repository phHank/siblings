import React from 'react'

const SiblingsLogo = ({height}) => (
    <div style={{position: 'relative', overflow: 'auto', height: height}}>
        <img 
            src='/static/logo.png'
            alt='Siblings together makes sense - hugging giraffes logo'
            className='mh-100 mw-100'
        />
    </div>
)

export default SiblingsLogo