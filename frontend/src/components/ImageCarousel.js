import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const ImageCarousel = ({images}) => (
    <Carousel showStatus={false} infiniteLoop={true} renderThumbs={() => undefined}>
        {images.map((image, i) => (
            <div key={image.caption + i}>
                <img src={`http://localhost:8000/media/${image.original}`} />
                {image.caption && (
                    <div className="d-flex flex-row justify-content-around legend bg-dark p-0">
                        <h6>{image.caption.split(';')[0]}</h6>
                        <h6>{image.caption.split(';')[1]}</h6>
                    </div>
                )}
            </div>
        ))}
    </Carousel>
)

export default ImageCarousel

