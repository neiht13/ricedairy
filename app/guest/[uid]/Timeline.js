// components/Timeline.jsx
"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import React, { use, useEffect, useState } from "react";
import { fetchNhatky } from "./action";


const groupByType = (items) => {
  // Sắp xếp các mục theo ngày tăng dần
  items.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Nhóm các mục theo 'type'
  return items.reduce((groups, item) => {
    const { type } = item;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {});
};

export default function Timeline({user, nhatkys}) {
  const [nhatky, setNhatky] = useState();
  const [muavu, setMuavu] = useState(); // Mùa vụ mặc định


  useEffect(() => {
    // const fetchNhatky = async () => {
    //   try {
    //     const res = await fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${user?.username}&muavu=${muavu}`);
    //     const data = await res.json();
    //     setNhatky(data);
    //   } catch (error) {
    //     console.error("Error fetching timeline data:", error);
    //   }
    // };

    muavu && fetchNhatky(user?.username, muavu);
  }, [muavu]);

  const groupedItems =groupByType(nhatky || nhatkys);
  const types = Object.keys(groupedItems);131

  return (
    <div id="timeline" className="bg-green-50 py-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 items-center mb-6">
          <div></div>
          <h2 className="text-3xl font-bold text-center">Nhật ký canh tác</h2>
          <div className="bg-white rounded-xl">
            <Select onValueChange={(value) => setMuavu(value)}>
              <SelectTrigger aria-label="Mùa vụ">
                <SelectValue placeholder="Chọn mùa vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mùa vụ</SelectLabel>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  {/* Thêm các mùa vụ khác nếu cần */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
          <div className="border-opacity-20 border-gray-700 h-full border left-4 md:left-1/2"></div>
          {types.length === 0 ? (
            <p className="text-center text-gray-500">Không có nhật ký nào cho mùa vụ này.</p>
          ) : (
            types.map((type, stageIndex) => (
              <div key={type} className="mb-12">
                {/* Tiêu đề loại công việc */}
                <div className="flex justify-center mb-6">
                  <span className="z-20 px-4 py-2 bg-green-800 text-white rounded-full text-sm font-semibold capitalize">
                    {stageIndex + 1}. {type.replace(/bonphan|tiacanh/, (match) => (match === "bonphan" ? "Bón phân" : "Cắt tỉa cành"))}
                  </span>
                </div>
                {groupedItems[type].map((item, index) => (
                  <div
                    key={item.id}
                    className={`mb-4 flex justify-between items-center w-full ${
                      index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                    } flex-col`}
                  >
                    <div className="order-1 md:w-5/12 hidden md:block"></div>
                    <div className="z-20 flex items-center order-1 bg-green-800 shadow-xl w-8 h-8 rounded-full">
                      <h1 className="mx-auto font-semibold text-lg text-white">
                        {index + 1}
                      </h1>
                    </div>
                    <Card className="order-1 w-full md:w-5/12 px-4 py-4">
                      <div className="flex flex-col md:flex-row">
                        <CardContent className="flex-1 px-6 py-0">
                          <time className="mb-1 text-sm font-normal leading-none text-green-500 dark:text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </time>
                          <h3 className="text-lg font-semibold text-green-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-base font-normal text-gray-700 dark:text-gray-400">
                            {item.detail}
                          </p>
                          {item.type === "bonphan" && (
                            <div className="mt-2">
                              <Badge variant="secondary">Bón phân</Badge>
                            </div>
                          )}
                          {item.type === "tiacanh" && (
                            <div className="mt-2">
                              <Badge variant="secondary">Cắt tỉa cành</Badge>
                            </div>
                          )}
                        </CardContent>
                        {item.image && item.image !== "noimage" && (
                          <div className="md:w-1/3 mt-4 md:mt-0">
                            <img
                              src={`http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=${item.image}`}
                              alt="Card image"
                              className="w-full h-full object-contain rounded"
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
