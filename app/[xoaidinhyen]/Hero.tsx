'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const images = [
  "https://thuonghieusanpham.vn/stores/news_dataimages/thuonghieusanphamvn/072020/03/10/xoai-cat-hoa-loc-dac-san-noi-tieng-xu-tien-giang-59-.1304.jpg",
  "https://image.tienphong.vn/w890/Uploaded/2024/rkznae/2019_11_26/17331618_2_xoai_15607606907461874244108_TPHH.jpg",
]

//@ts-ignore
export default function Hero({user}) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
  }

  return (
    <div id='hero' className="container mx-auto px-4 py-8">
        <div className="mt-8 text-center">
        {user?.donvihtx && <h1 className="text-xl font-bold mb-2">{user?.donvihtx}</h1>}
        {user?.diachi && <h1 className="text-base font-bold mb-8">Địa chỉ: {user?.diachi}</h1>}
        <h1 className="text-4xl font-bold mb-4">Xoài Bình An</h1>
        <h1 className="text-2xl font-bold mb-4">Hương Vị Truyền Thống Từ Quê Hương</h1>
        <div className='flex flex-row items-center justify-between md:px-32'>
          {/* <img src='/logo_gcc.png' alt='' width={100} height={100} className='m-8'/> */}
          <p className="text-xl text-gray-600 mb-6">
        </p>
        </div>
        {/* <Button size="lg">Get Started</Button> */}
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div className="overflow-hidden h-[300px] md:h-[400px]">
              {images.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform border-0 -translate-y-1/2 bg-transparent hover:bg-white/80"
              onClick={prevImage}
            >
              <ChevronLeftIcon className="h-8 w-8 font-bold text-white hover:text-black" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform border-0 -translate-y-1/2 bg-transparent hover:bg-white/80"
              onClick={nextImage}
            >
              <ChevronRightIcon className="h-8 w-8 font-bold text-white hover:text-black" />
            </Button>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}