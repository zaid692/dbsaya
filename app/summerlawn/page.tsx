'use client'

import React, { useEffect, useState } from 'react'
import Cardb from '../components/cardtest'
import ProductModal from '../components/splitpic'

type Product = {
  id: number
  image: string
  hoverImage: string
  name: string
  price: string
}

type SummerData = {
  bannerImage: string
  categoryFilters: {
    image: string
    label: string
  }[]
  products: Product[]
}

export default function Summer() {
  const [data, setData] = useState<SummerData | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleuser, setRoleUser] = useState<'admin' | 'user' | null>(null)

  useEffect(() => {
    fetch('/api/summerj')
      .then((res) => {
        if (!res.ok) {
          alert(`Fetch failed with status: ${res.status}`)
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((json) => {
     
        setData(json)
      })
      .catch((error) => {
        alert('Error fetching summer data: ' + error.message)
        console.error(error)
      })

    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    setRoleUser(isAdmin ? 'admin' : 'user')
    console.log('Role:', isAdmin ? 'admin' : 'user')
  }, [])

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (!data || roleuser === null) return <div>Loading...</div>

  return (
    <div className="mt-16 px-5">
      <img
        src={data.bannerImage}
        alt="Summer Collection"
        className="w-full h-auto mb-4"
      />

      <div className="flex justify-center gap-8">
        {data.categoryFilters.map((filter, index) => (
          <span key={index}>
            <img
              src={filter.image}
              alt={`Filter ${index + 1}`}
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-center">{filter.label}</p>
          </span>
        ))}
      </div>

      <h1 className="text-center text-xl font-semibold mb-4">
        Total Products: {data.products.length}
      </h1>

      <div className="flex justify-between items-center mb-6">
        <span>Filter</span>
        <button className="bg-black text-white px-4 py-2 rounded">!!!</button>
        <select className="px-4 py-2 border-2 border-gray-400 rounded">
          <option value="">- Low to High -</option>
          <option value="">- Select -</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {data.products.map((product) => (
          <Cardb
            key={product.id}
            name={product.name}
            image={product.image}
            hoverImage={product.hoverImage}
            price={product.price}
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>

      <div className="flex items-center p-10 flex-col">
        <span>Your viewed 0 of {data.products.length} products</span>
        <div className="flex justify-center mt-2">
          <div className="h-1 w-24 bg-black"></div>
          <div className="h-1 w-24 bg-gray-400"></div>
        </div>
        <button className="px-6 py-2 rounded-full bg-white mt-8 text-black border-black border-2 hover:bg-black hover:text-white">
          Load more
        </button>
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          roleuser={roleuser}
        />
      )}
    </div>
  )
}
