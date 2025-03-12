'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const images = [
  "/images/srhd/sr1.jpg",
  "/images/srhd/sr2.jpg",
  "/images/srhd/sr3.jpg",
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
        <h1 className="text-4xl font-bold mb-4">Sầu Riêng Hùng Dũng</h1>
        <h1 className="text-2xl font-bold mb-4">Tinh Hoa Từ Hợp tác xã Hùng Dũng, Huyện Tháp Mười, Đồng Tháp</h1>
        <div className='flex flex-row items-center justify-between md:px-32'>
          {/* <img src='/logo_gcc.png' alt='' width={100} height={100} className='m-8'/> */}
          <p className="text-xl text-gray-600 mb-6">
          Sầu riêng Hùng Dũng của Hợp tác xã Hùng Dũng tại huyện Tháp Mười, tỉnh Đồng Tháp, nổi bật với hương vị đậm đà và chất lượng vượt trội. Được trồng trên những vườn cây được chăm sóc kỹ lưỡng dưới sự quản lý chuyên nghiệp, mỗi trái sầu riêng Hùng Dũng đều đạt độ chín hoàn hảo, thịt ngọt mịn và mùi thơm đặc trưng khó quên. Hợp tác xã Hùng Dũng không chỉ cam kết mang đến cho người tiêu dùng sản phẩm tươi ngon mà còn góp phần thúc đẩy phát triển kinh tế địa phương, tạo công ăn việc làm cho người dân vùng Tháp Mười. Với sự kết hợp giữa truyền thống canh tác lâu đời và công nghệ hiện đại, sầu riêng Hùng Dũng đang dần khẳng định vị thế trên thị trường trong và ngoài nước, trở thành lựa chọn hàng đầu của những người yêu thích sầu riêng.        </p>
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