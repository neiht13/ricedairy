import { Card, CardContent } from "@/components/ui/card"
import { FaLeaf, FaSeedling, FaTractor, FaHandshake, FaRocket } from 'react-icons/fa'

interface TimelineItem {
  date: string
  title: string
  description: string
  giaiDoan: string
  icon: JSX.Element
}

const timelineItems: TimelineItem[] = [
  {
    date: "May 2023",
    giaiDoan: "Giai đoạn 1",
    title: "Khởi Động Dự Án",
    description: "Bắt đầu phát triển dòng sản phẩm mới của chúng tôi, đặt ra những mục tiêu đầy tham vọng cho năm tới.",
    icon: <FaLeaf className="text-green-500 w-6 h-6" />
  },
  {
    date: "August 2023",
    title: "Cột Mốc Quan Trọng",
    giaiDoan: "Giai đoạn 1",
    description: "Phát hành phiên bản beta của sản phẩm chủ lực, nhận được phản hồi tích cực từ những người dùng đầu tiên.",
    icon: <FaSeedling className="text-green-500 w-6 h-6" />
  },
  {
    date: "November 2023",
    title: "Mở Rộng Đội Ngũ",
    giaiDoan: "Giai đoạn 2",
    description: "Chào đón năm thành viên mới, mang đến những góc nhìn và kỹ năng mới để đẩy nhanh tiến độ.",
    icon: <FaTractor className="text-green-500 w-6 h-6" />
  },
  {
    date: "February 2024",
    title: "Thông Báo Hợp Tác",
    giaiDoan: "Giai đoạn 3",
    description: "Hình thành quan hệ đối tác chiến lược với một đối tác hàng đầu trong ngành, mở ra những cơ hội phát triển mới.",
    icon: <FaHandshake className="text-green-500 w-6 h-6" />
  },
  {
    date: "April 2024",
    title: "Ra Mắt Sản Phẩm",
    giaiDoan: "Giai đoạn 3",
    description: "Chính thức phát hành sản phẩm ra thị trường, đánh dấu một thành tựu quan trọng của toàn đội ngũ.",
    icon: <FaRocket className="text-green-500 w-6 h-6" />
  }
]

// Hàm để nhóm các sự kiện theo giai đoạn
const groupByGiaiDoan = (items: TimelineItem[]) => {
  return items.reduce((groups: { [key: string]: TimelineItem[] }, item) => {
    const { giaiDoan } = item
    if (!groups[giaiDoan]) {
      groups[giaiDoan] = []
    }
    groups[giaiDoan].push(item)
    return groups
  }, {})
}

export default function Timeline() {
  const groupedItems = groupByGiaiDoan(timelineItems)
  const giaiDoans = Object.keys(groupedItems)

  return (
    <section id="timeline" className="bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Hành Trình Phát Triển</h2>
        <div className="relative wrap overflow-hidden p-10 h-full">
          {/* Đường trung tâm */}
          <div className="border-2 absolute border-opacity-20 border-green-700 h-full border md:left-1/2 left-4 transform -translate-x-1/2"></div>

          {giaiDoans.map((giaiDoan, stageIndex) => (
            <div key={giaiDoan} className="mb-12">
              {/* Tiêu đề giai đoạn */}
              <div className="flex justify-center mb-6">
                <span className="px-4 py-2 bg-green-700 text-white rounded-full text-sm font-semibold">
                  {giaiDoan}
                </span>
              </div>

              {groupedItems[giaiDoan].map((item, index) => (
                <div 
                  className={`mb-8 flex justify-between items-center w-full ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                  } flex-row`} 
                  key={item.date + index}
                >
                  {/* Không gian phía bên */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Icon */}
                  <div className="z-20 flex items-center left-4 order-1 bg-green-700 shadow-xl w-12 h-12 rounded-full">
                    {item.icon}
                  </div>

                  {/* Nội dung Timeline */}
                  <Card className="order-1 bg-white shadow-lg w-full md:w-5/12 px-6 py-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardContent>
                      <time className="mb-2 text-sm font-medium text-green-500">{item.date}</time>
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                      {/* Thêm thông tin chi tiết nếu cần */}
                      {/* <div className="grid grid-cols-2 gap-4 mt-4">
                        <p className="text-sm font-semibold text-gray-700">Bón phân</p>
                        <p className="text-sm font-semibold text-gray-700">Phun thuốc</p>
                      </div> */}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
