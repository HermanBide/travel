import React from 'react'
import galleryImages from './GalleryImages'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
    <Masonry gutter='1rem'>
        {
            galleryImages.map((image, index) => (
                <img className='masonry__img' src={image} key={index} alt="" style={{ width: '100%', display: 'block', borderRaduis: '10px'}} />
            ))
        }
    </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery