'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface ImageCarouselProps {
  images: { image: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]} // Configurar los módulos aquí
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image width={640} height={360} src={image.image} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
