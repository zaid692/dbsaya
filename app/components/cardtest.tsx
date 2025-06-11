'use client'
import React from 'react'

type CardProps = {
  image: string
  hoverImage: string
  name: string  
  price: string
  
  onClick: () => void
}

const Cardb = ({ image, hoverImage, name, price, onClick }: CardProps) => {
  return (
    <div>
      <div 
        className="bg-white p-3 w-74 relative group cursor-pointer"
        onClick={onClick}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-120 object-cover rounded-t-lg transition-opacity duration-300 group-hover:opacity-0"
        />
        
        <img
          src={hoverImage}
          alt={name}
          className="absolute top-0 left-0 w-full h-120 object-cover rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 hover:bg-black hover:text-white py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add to Cart
        </button>
      </div>
      <div className="mt-1">
        <h2>{name}</h2>
        <p className="text-gray-700 mt-2 mb-6">{price}</p>
      </div>
    </div>
  )
}

export default Cardb