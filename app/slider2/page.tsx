"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch('slider.json');
        const data: SliderData = await response.json();
        setBackground(data.background);
        setVideos(data.videos);
        setImages(data.images);
      } catch (error) {
        console.error("Failed to load slider data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="text-2xl font-medium">Loading content...</div>
      </div>
    );
  }

  return (
    <div id="slider-root" className="relative">
    

      <div
        id="slider-wrapper"
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hidden"
      >
        <div id="slider-content">
          {background && (
            <div
              key={background.id}
              className="h-screen w-full bg-cover bg-center snap-start flex items-center justify-center text-white text-4xl font-bold"
              style={{ backgroundImage: `url('${background.src}')` }}
            />
          )}

          {videos.map((video) => (
            <div
              key={video.id}
              className="h-screen w-full bg-black snap-start flex items-center justify-center"
            >
              <video
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="auto"
              />
            </div>
          ))}

          {images.map((image) => (
            <div
              key={image.id}
              className="h-screen w-full bg-black snap-start flex items-center justify-center"
            >
              <img
                src={image.src}
                alt={`Slide ${image.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="h-screen w-full bg-gray-200 snap-start flex items-center justify-center">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
