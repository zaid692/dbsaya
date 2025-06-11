'use client'
import React, { useEffect, useState } from 'react'

type ProductModalProps = {
  isOpen: boolean
  onClose: () => void
  roleuser: 'admin' | 'user'
  product: {
    id: number
    image: string
    hoverImage: string
    name: string
    price: string
  }
}

export default function ProductModal({ isOpen, onClose, roleuser, product }: ProductModalProps) {
  const [newImage, setNewImage] = useState<File | null>(null)
  const [newHoverImage, setNewHoverImage] = useState<File | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
   
    setIsAdmin(roleuser === 'admin')
    console.log('ProductModal sees roleuser:', roleuser)
  }, [roleuser])

  if (!isOpen) return null

  const handleSave = async () => {
    try {
      const uploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
          console.log('Uploading file to /api/upload...')
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        console.log('Upload response status:', res.status)

        if (!res.ok) throw new Error('Upload failed')

        const data = await res.json()
        if (!data.url) throw new Error('No URL returned')

        return data.url
      }

      if (newImage) {
        const uploadedUrl = await uploadFile(newImage)
        await fetch('/api/summerapi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'productImage',
            id: product.id,
            newSrc: uploadedUrl,
          }),
        })
      }

      if (newHoverImage) {
        const uploadedUrl = await uploadFile(newHoverImage)
        await fetch('/api/summerapi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'productHoverImage',
            id: product.id,
            newSrc: uploadedUrl,
          }),
        })
      }

      onClose()
    } catch (error) {
      console.error(error)
      alert('Error saving images.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-black text-2xl hover:text-gray-600"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <img
              src={product.image}
              alt={`${product.name} main`}
              className="w-full h-auto rounded-lg"
            />
            {isAdmin && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
                className="mt-2"
              />
            )}
          </div>

          <div className="w-full">
            <img
              src={product.hoverImage}
              alt={`${product.name} hover`}
              className="w-full h-auto rounded-lg"
            />
            {isAdmin && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewHoverImage(e.target.files?.[0] ?? null)}
                className="mt-2"
              />
            )}
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  )
}
