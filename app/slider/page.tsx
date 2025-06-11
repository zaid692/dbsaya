"use client";
import React, { useEffect, useState } from 'react';
import Modal from '../components/picmodel';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

type Slide = {
  id: number;
  src: string;
};

type SliderData = {
  background: Slide;
  videos: Slide[];
  images: Slide[];
};

export default function Slider() {
  const [background, setBackground] = useState<Slide | null>(null);
  const [videos, setVideos] = useState<Slide[]>([]);
  const [images, setImages] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editType, setEditType] = useState<'background' | 'video' | 'image' | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ admin state

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin');
    setIsAdmin(admin === 'true');
  }, []);

  useEffect(() => {
    fetch('/api/sliderj')
      .then((res) => res.json())
      .then((data: SliderData) => {
        setBackground(data.background);
        setVideos(data.videos);
        setImages(data.images);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load slider data:", err);
        setIsLoading(false);
      });
  }, []);

  function openEditModal(type: 'background' | 'video' | 'image', id: number) {
    setEditType(type);
    setEditId(id);
    setModalOpen(true);
  }

  async function saveChanges(newSrc: string) {
    if (!editType || editId === null) return;

    if (editType === 'background' && background) {
      setBackground({ ...background, src: newSrc });
    } else if (editType === 'video') {
      setVideos(videos.map(v => v.id === editId ? { ...v, src: newSrc } : v));
    } else if (editType === 'image') {
      setImages(images.map(img => img.id === editId ? { ...img, src: newSrc } : img));
    }

    try {
      await fetch('/api/slider', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: editType,
          id: editId,
          newSrc: newSrc,
        }),
      });
    } catch (err) {
      console.error("Failed to update slider.json:", err);
    }

    setModalOpen(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="text-2xl font-medium">Loading content...</div>
      </div>
    );
  }

  return (
    <div id="slider-root" className="relative bg-transparent">
      <Navbar />
      <div
        id="slider-wrapper"
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hidden"
      >
        <div id="slider-content">
          {background && (
            <div
              id={`background-slide-${background.id}`}
              className="h-screen w-full bg-cover bg-center snap-start flex items-center justify-center text-white text-4xl font-bold relative"
              style={{ backgroundImage: `url('${background.src}')` }}
            >
              {isAdmin && (
                <button
                  onClick={() => openEditModal('background', background.id)}
                  className="absolute bottom-1 right-4 bg-black bg-opacity-100 px-3 py-1 rounded text-white border-2 text-sm"
                >
                  Edit Background
                </button>
              )}
            </div>
          )}

          {videos.map((video) => (
            <div
              key={video.id}
              id={`video-slide-${video.id}`}
              className="sm:w-full h-screen w-fit bg-black snap-start flex items-center justify-center relative"
            >
              <video
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="auto"
              />
              {isAdmin && (
                <button
                  onClick={() => openEditModal('video', video.id)}
                  className="absolute bottom-1 right-4 bg-transparent border-2 bg-opacity-50 px-3 py-1 rounded text-black"
                >
                  Edit Video
                </button>
              )}
            </div>
          ))}

          {images.map((image) => (
            <div
              key={image.id}
              id={`image-slide-${image.id}`}
              className="h-screen w-full bg-black snap-start flex items-center justify-center relative"
            >
              <img
                src={image.src}
                id={`image-${image.id}`}
                className="w-full h-full object-cover"
                alt={`Slide ${image.id}`}
              />
              {isAdmin && (
                <button
                  onClick={() => openEditModal('image', image.id)}
                  className="absolute bottom-1 right-4 bg-transparent bg-opacity-50 px-3 py-1 rounded text-black"
                >
                  Edit Image
                </button>
              )}
            </div>
          ))}

          <div className="h-screen w-full bg-gray-200 snap-start flex items-center justify-center">
          
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title={editType ? `Edit ${editType}` : ''}
        onClose={() => setModalOpen(false)}
        onSave={saveChanges}
      />
    </div>
  );
}
