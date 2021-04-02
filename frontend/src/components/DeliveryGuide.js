import React, { useState } from 'react'

const DeliveryGuide = () => {
    const [showDelivery, setShowDelivery] = useState(false)
    const [showCollection, setShowCollection] = useState(false)

    return (
        <div className='row w-100'>
            <div
                onMouseOver={() => setShowDelivery(true)}
                onMouseOut={() => setShowDelivery(false)}
            >
                <small
                  style={{cursor: 'help'}}
                  className='bg-secondary text-light rounded ml-1 px-1 col-md'
                >
                    Entrega a domicilio: $65 MXN*
                </small>
                {showDelivery && (
                    <div className='bg-secondary text-light rounded px-1 w-75 position-absolute'>
                        Si eliges entrega a domicilio, recibirás un correo electrónico donde se confirme tu compra y se te indique el día y el horario de entrega. Los 65 MXN se tendrán que pagar en efectivo al repartidor el día acordado.
                        <br/>
                        <small>*Únicamente, Ciudad de México. Para otra ciudad manda un correo a siblingstms@gmail.com</small>
                    </div>
                )}
            </div>

            <div
                onMouseOver={() => setShowCollection(true)}
                onMouseOut={() => setShowCollection(false)}
            >
                <small
                  style={{cursor: 'help'}}
                  className='bg-secondary text-light rounded ml-1 px-1 col-md'
                >
                  Recoger en tienda: $0 MXN
                </small>

                {showCollection && (
                    <div className='bg-secondary text-light rounded px-1 w-75 position-absolute'>
                        Si eliges recoger en tienda, recibirás un correo electrónico donde se confirme que tu compra está lista para ser recolectada en el punto de venta que más te convenga:
                        <br/>
                        -Punto de venta La Roma** (Lunes de 11am a 5pm)
                        <br/>
                        -Punto de venta Las Águilas** (Viernes de 11am a 5pm)
                        <br/>
                        <small>**La dirección estará adjunta en el correo electrónico.</small>
                    </div>
                )}
            </div>

        </div>
    )
}

export default DeliveryGuide