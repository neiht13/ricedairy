'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const images = [
  "https://futureoffood.org/wp-content/uploads/2021/05/WEB-rice-planting.jpg",
  "https://modernfarmer.com/wp-content/uploads/2022/04/shutterstock_1566410314.jpg",
  "https://th.bing.com/th/id/R.180d15a29a33ee008e67bc14ad5c5923?rik=XZBbOLKCNM2Z1Q&pid=ImgRaw&r=0",
]

export default function Component() {
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
        <h1 className="text-4xl font-bold mb-4">Gạo Châu Thành</h1>
        <h1 className="text-2xl font-bold mb-4">Hương Vị Truyền Thống Từ Đồng Tháp</h1>
        <p className="text-xl text-gray-600 mb-6 md:px-32">
        Khám phá Gạo Châu Thành – sản phẩm gạo chất lượng cao được trồng và chăm sóc tỉ mỉ tại những cánh đồng bạt ngàn của Đồng Tháp. Với hương thơm đặc trưng, hạt gạo mềm dẻo và dinh dưỡng phong phú, Gạo Châu Thành không chỉ là lựa chọn hoàn hảo cho bữa ăn gia đình mà còn là niềm tự hào của nông dân Châu Thành, Đồng Tháp. Hãy trải nghiệm sự khác biệt từ từng hạt gạo và mang đến những bữa cơm ấm cúng, đầy ý nghĩa cho người thân yêu của bạn.
        </p>
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