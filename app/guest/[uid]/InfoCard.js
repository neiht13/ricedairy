// components/InfoCard.jsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function InfoCard({user, certifications, product}) {
  // const [user, setUser] = useState(null);
  // const [certifications, setCertifications] = useState([]);
  // const [product, setProduct] = useState(null);
  // const username = "huynhngocthai"; // Bạn có thể lấy từ context hoặc props
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
      const locationParts = user?.location?.split(',');

          if (locationParts && locationParts.length === 2) {
            const parsedLat = parseFloat(locationParts[0]);
            const parsedLng = parseFloat(locationParts[1]);
            if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
              setLat(parsedLat);
              setLng(parsedLng);
              console.log("Parsed Lat:", parsedLat, "Parsed Lng:", parsedLng);
            } else {
              console.error("Invalid latitude or longitude values.");
            }
          } else {
            console.error("Invalid location format.");
          }
  }, []);


  // useEffect(() => {
  //   // Fetch User Data
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${username}`);
  //       const data = await res.json();
  //       if (data.length > 0) {
  //         setUser(data[0]);
  //         console.log(data[0].location);


  //         const locationParts = data[0].location?.split(',');

  //         if (locationParts && locationParts.length === 2) {
  //           const parsedLat = parseFloat(locationParts[0]);
  //           const parsedLng = parseFloat(locationParts[1]);
  //           if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
  //             setLat(parsedLat);
  //             setLng(parsedLng);
  //             console.log("Parsed Lat:", parsedLat, "Parsed Lng:", parsedLng);
  //           } else {
  //             console.error("Invalid latitude or longitude values.");
  //           }
  //         } else {
  //           console.error("Invalid location format.");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   // Fetch Certifications Data
  //   const fetchCertifications = async () => {
  //     try {
  //       const res = await fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/fetch?user=${username}`);
  //       const data = await res.json();
  //       setCertifications(data);
  //     } catch (error) {
  //       console.error("Error fetching certifications:", error);
  //     }
  //   };

  //   // Fetch Product Data
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await fetch(`http://test.nhanchauthanhdt.vn/api/product/getby?masp=8794db4e-87b3-49dc-9870-a4708490c971`);
  //       const data = await res.json();
  //       setProduct(data[0]);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   };

  //   fetchUser();
  //   fetchCertifications();
  //   fetchProduct();
  // }, [username]);

  if (!user) {
    return <div>Đang tải...</div>;
  }

  return (
    <div id="info" className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Thông tin nông hộ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Thông tin cá nhân */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Các thông tin liên hệ của nông hộ.</CardDescription>
          </CardHeader>
          <div>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {user.image !== "noimage" ? (
                <AvatarImage
                  src={`http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=${user.image}`}
                  alt="User avatar"
                />
              ) : (
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">Địa chỉ: {user.donvi}</p>
              <div className="mt-2">
                <Badge variant="secondary">Số điện thoại: {user.phone}</Badge>
              </div>
            </div>
            
          </CardContent>
          <MapComponent
            key={`${lat}-${lng}`}
            position={[lat, lng]}
            name={user.name}
          />
          </div>
        </Card>
        {/* Bản đồ hiển thị vị trí nông hộ */}
      {/* <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Vị trí nông hộ</CardTitle>
          <CardDescription>Địa điểm chính xác của nông hộ trên bản đồ.</CardDescription>
        </CardHeader>
        <CardContent>
          <MapComponent
            position={[lat, lng]}
            name={user.name}
          />
        </CardContent>
      </Card> */}

{certifications.length === 0 ?<></> :
        <Card className="flex-1">
          <div className="flex flex-col md:flex-row">
            <CardContent className="flex-1 p-6 md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-4">Thông tin chứng nhận</h1>
                {certifications.length === 0 ? (
                  <p>Không có chứng nhận nào.</p>
                ) : (
                  certifications.map((cert) => (
                    <div key={cert.id} className="mb-4">
                      <h3 className="text-lg font-semibold">{cert.chungchi} {cert.tieuchuan}</h3>
                      <p className="text-sm text-gray-500">
                        Từ ngày: {new Date(cert.hieuluc).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Địa chỉ: {cert.diachi}
                      </p>
                      <p className="text-sm mt-2">
                        {cert.nsx} - {cert.cssx}
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">{cert.tieuchuan.toUpperCase()}</Badge>
                      </div>
                      {cert.image && cert.image !== "noimage" && (
                        <img
                          src={`http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=${cert.image}`}
                          alt="Certification image"
                          className="mt-2 w-full h-40 object-cover rounded"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <div className="md:w-1/3">
              {product && product.image !== "noimage" ? (
                <img
                  src={`http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=${product.image}`}
                  alt="Product image"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <img
                  src="https://th.bing.com/th/id/OIP.BYccsyj9oZY7vl6XQvvHGAHaKY?rs=1&pid=ImgDetMain"
                  alt="Default image"
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
          </div>
        </Card>
        }
      </div>

      {/* Thông tin sản phẩm */}
      {product && (
        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
            <CardDescription>Chi tiết về sản phẩm nông nghiệp.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {product.image !== "noimage" ? (
                <AvatarImage
                  src={`http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=${product.image}`}
                  alt="Product avatar"
                />
              ) : (
                <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">Chủ sở hữu: {product.cssx}</p>
              <p className="text-sm text-gray-500">Đóng gói: {product.donggoi}</p>
              <p className="text-sm text-gray-500">Ngày thu hoạch: {new Date(product.ngaythuhoach).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Hạn sử dụng: {new Date(product.hsd).toLocaleDateString()}</p>
              <div className="mt-2">
                <Badge variant="secondary">Mã sản phẩm: {product.masp}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
