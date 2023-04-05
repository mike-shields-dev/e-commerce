import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images }) => {  
  const [imageIndex, setImageIndex] = useState(0);
  
  if(!images?.length) return;
  
  const mainImage = images[imageIndex];

  return (
    <Wrapper>
        <img src={mainImage.url} alt="main" className="main" />
        <div className="gallery">
          {images.map((image, i) => {
            const { id, url, filename } = image;
            return (
              <img 
                key={id} 
                src={url} 
                alt={filename} 
                onClick={() => setImageIndex(i)} 
                className={`${imageIndex === i ? 'active' : ''}`}  
              />
            )
            })}
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
