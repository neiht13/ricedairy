// components/Contact.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendContact } from "./action";

export default function Contact() {
  // Quản lý trạng thái form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Hàm xử lý thay đổi input
  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      sendContact(formData);
    } catch (error) {
      setFeedback({ type: "error", message: "Đã xảy ra lỗi khi gửi liên hệ." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="flex items-center justify-center py-12 bg-green-50"
    >
      <Card className="w-full max-w-md mx-4">
        <CardTitle className="text-2xl pt-8 pl-8">Liên hệ</CardTitle>
        <CardDescription className="pl-8 pb-8">Để lại thông tin liên hệ cần hỗ trợ. </CardDescription>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ông/bà */}
            <div className="space-y-2">
              <Label htmlFor="name">Ông/Bà</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Nhập email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                type="tel"
                pattern="[0-9]{10,15}" // Thêm regex để kiểm tra số điện thoại
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tin nhắn */}
            <div className="space-y-2">
              <Label htmlFor="message">Tin nhắn</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Nhập chi tiết"
                className="min-h-[100px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phản hồi người dùng */}
            {feedback && (
              <div
                className={`p-4 rounded ${
                  feedback.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Nút gửi */}
            <Button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-green-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
