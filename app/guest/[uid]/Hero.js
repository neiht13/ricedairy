'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ReadMore from "./ReadMore"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const images = [
  "https://futureoffood.org/wp-content/uploads/2021/05/WEB-rice-planting.jpg",
  "https://modernfarmer.com/wp-content/uploads/2022/04/shutterstock_1566410314.jpg",
  "https://th.bing.com/th/id/R.180d15a29a33ee008e67bc14ad5c5923?rik=XZBbOLKCNM2Z1Q&pid=ImgRaw&r=0",
]

//@ts-ignore
export default function Hero({user}) {
  const [currentImage, setCurrentImage] = useState(0)
  const [htx, setHtx] = useState("")
  const [diachi, setDiachi] = useState("")

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000) // Change image every 5 seconds
    if (user && user.donvi && user.donvi.split("/").length > 0) {
      setHtx(user.donvi.split("/")[0])
      setDiachi(user.donvi.split("/")[1])
    }
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
        <div className="m-8 text-center">
        {htx && <h1 className="text-xl font-bold mb-2">{htx}</h1>}
        {diachi && <h1 className="text-base font-bold mb-8">Địa chỉ: {diachi}</h1>}
        <h1 className="text-4xl font-bold mb-4">Nhãn Châu Thành</h1>
        <h1 className="text-2xl font-bold mb-4">Hương Vị Truyền Thống Từ Châu Thành</h1>
        <div className='md:px-32'>
          {/* <img src='/logo_gcc.png' alt='' width={100} height={100} className='m-8'/> */}
          <p className="text-xl text-gray-600 mb-6">
          Gắn bó với vùng đất Châu Thành từ những năm 80 của thế kỷ trước với hiều thăng trầm, đến nay, nhãn Châu Thành vẫn là cây trồng chủ lực trong phát triển kinh tế địa phương. Với người dân Châu Thành, nhãn không chỉ là sản vật đặc trưng mà còn là niềm tự hào của quê hương...
        </p>

        <p className="text-xl text-gray-600 m-8">Thăng trầm cây nhãn Châu Thành</p>
        <ReadMore>

Châu Thành là huyện phía Nam tỉnh Đồng Tháp, nơi có con sông Tiền, sông Hậu chảy qua tạo nên vùng đất tràn ngập phù sa. Với diện tích tự nhiên 246km2, địa hình là dãy cù lao và đất giồng ven sông tương đối cao ráo, khí hậu thuận lợi rất thích hợp phát triển cây ăn trái.
Theo các cụ cao tuổi ở địa phương, nhãn du nhập và trồng tại Châu Thành từ những năm 80 thế kỷ trước, ban đầu, người dân chủ yếu trồng nhãn long, nhãn da bò. Từ năm 2007, nhãn da bò bị dịch bệnh chổi rồng tàn phá, người dân tìm chọn loại cây trồng mới để thay thế. Thời điểm này, giống nhãn idor (sau này là nhãn Châu Thành) được xem là cây trồng triển vọng giúp nhà vườn Châu Thành chuyển đổi, thay thế giống nhãn truyền thống.
Có hơn 30 năm canh tác cây nhãn, ông Nguyễn Nhất Linh (SN 1951) ở ấp Tân An, xã An Nhơn nhớ lại, thời điểm dịch chổi rồng bùng phát, ông cũng như nhiều nhà vườn nơi đây loay hoay tìm loại cây trồng thích hợp để thay thế. Năm 1994, ở vùng An Nhơn có phong trào trồng nhãn idor thay cho giống nhãn da bò bị dịch bệnh, ông mua thử 1 nhánh nhãn idor về trồng... “Những ngày đầu, loại cây này rất khó canh tác. Nhãn dù phát triển xum xuê nhưng lại không ra hoa, đậu trái. Tìm tòi, học hỏi kỹ thuật canh tác trong một thời gian, cây mới “đơm hoa kết trái”. Trong vụ đầu, 1 cây nhãn cho vài trăm ký, nhận thấy hiệu quả, tôi nhân lên trồng 33 nhánh, rồi từng bước chuyển toàn bộ đất qua trồng nhãn idor”, ông Nguyễn Nhất Linh chia sẻ.
Nhờ giống nhãn phù hợp, lại được thị trường chấp nhận nên thu nhập của gia đình ông ngày càng tăng lên. Từ những công nhãn ban đầu, ông tích góp rồi mua thêm được 2ha trồng nhãn idor. Theo ông Linh, bình quân mỗi cây nhãn (hơn 20 năm tuổi) có thể cho khoảng 400 - 500kg (bình quân mỗi công 10 cây nhãn), 1 năm làm 1 vụ, với giá nhãn từ 20.000 đồng/kg trở lên, trừ hết chi phí, mỗi năm, ông thu được vài trăm triệu đồng.
<p className="text-xl text-gray-600 m-8 left-2">Khẳng định thương hiệu từ chất lượng</p>
Góp phần khẳng định danh tiếng cho nông sản này, năm 2016, nhãn Châu Thành (nhãn idor) được Cục Sở hữu Trí tuệ - Bộ Khoa học và Công nghệ cấp Giấy chứng nhận bảo hộ nhãn hiệu. Từ sự kiện này, nhãn Châu Thành từng bước khẳng định nhãn hiệu, chất lượng thông qua việc liên kết với các doanh nghiệp trong và ngoài nước, đưa trái nhãn Châu Thành “du nhập” các thị trường khó tính như: Mỹ, Nhật Bản, Hàn Quốc và một số nước Châu Âu...
Với đặc tính nổi trội về khả năng thích nghi với môi trường, chống chịu bệnh tốt, năng suất cao và thị trường ổn định nên giống nhãn này nhanh chóng được trồng phủ khắp các xã trên địa bàn huyện. Đến nay, diện tích nhãn trên địa bàn huyện là 2.671ha, tập trung nhiều tại các xã: An Nhơn, An Phú Thuận, Tân Nhuận Đông, An Khánh. Sản lượng ước tính khoảng 50.000 tấn/năm, trong đó có khoảng 90% đủ điều kiện xuất khẩu.
Để phát triển trái nhãn theo hướng bền vững mang lại lợi ích kinh tế lâu dài cho người dân và doanh nghiệp, Châu Thành từng bước quy hoạch lại vùng trồng, xây dựng nhãn hiệu, nâng cao chất lượng vùng nguyên liệu nhãn đáp ứng các điều kiện khắc khe của thị trường về chất lượng sản phẩm...
Đến nay, vùng trồng nhãn của huyện có 126,19ha được cấp chứng nhận VietGAP. Có 671,23ha/23 mã số vùng trồng xuất khẩu sang các thị trường khó tính (Mỹ, Úc, Châu Âu...) và Trung Quốc. Sản phẩm nhãn Châu Thành đảm bảo các tiêu chuẩn về chất lượng, hình thái, mẫu mã sản phẩm theo tiêu chuẩn Nhãn hiệu chứng nhận “Nhãn Châu Thành - Đồng Tháp”.
Việc phát triển các tổ chức liên kết sản xuất gắn với tiêu thụ nhãn (hợp tác xã, tổ hợp tác, hội quán) được địa phương chú trọng. Hiện, huyện hình thành và phát triển được 2 hợp tác xã nhãn, 7 tổ hợp tác và 2 hội quán với 350 thành viên, hội viên. Thông qua các tổ chức này đã kết nối, hình thành được các chuỗi liên kết tiêu thụ ổn định giữa các doanh nghiệp và hợp tác xã với diện tích liên kết đạt khoảng 10.000 tấn/năm.
Ông Phan Thanh Dũng - Phó Chủ tịch UBND huyện Châu Thành cho biết, nhãn là một trong những ngành hàng chủ lực, thế mạnh của huyện trong thực hiện tái cơ cấu ngành nông nghiệp. Định hướng thời gian tới, huyện tiếp tục xây dựng kế hoạch phát triển vùng sản xuất nhãn tập trung, gắn với đẩy mạnh chuyển giao các tiến bộ khoa học kỹ thuật vào sản xuất, nhất là ứng dụng chuyển đổi số trong truy xuất nguồn gốc sản phẩm.
Cùng với đó, huyện sẽ rà soát lại hệ thống hạ tầng nông nghiệp, đảm bảo các điều kiện để nông dân trồng rải vụ; tiếp tục vận dụng, hỗ trợ các hợp tác xã tiếp cận các chính sách trong liên kết sản xuất và phát triển sản phẩm nhãn theo chuỗi giá trị; tăng cường quảng bá phát triển nhãn hiệu “Nhãn Châu Thành”, mở rộng thị trường tiêu thụ; đẩy mạnh tiêu thụ sản phẩm nhãn trên các sàn thương mại điện tử, mạng xã hội; thu hút đoanh nghiệp liên kết với vùng trồng, từng bước nâng cao hiệu quả kinh tế cây nhãn...
        </ReadMore>
        
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