// components/ReadMore.jsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ReadMore = ({ children, maxHeight = 120 }) => { // maxHeight tính bằng pixel
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsTruncated(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  return (
    <div>
      <div
        ref={contentRef}
        className={`text-base text-gray-600 mb-6 transition-all duration-300 ${
          !isExpanded ? `overflow-hidden` : ""
        }`}
        style={{
          maxHeight: !isExpanded ? `${maxHeight}px` : "none",
          lineHeight: "1.5em",
        }}
      >
        {children}
      </div>
      {isTruncated && (
        <Button
        variant={"outline" }
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm hover:underline focus:outline-none mr-8"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
