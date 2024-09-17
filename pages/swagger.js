// pages/swagger.js
import { useEffect, useRef } from 'react';
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

export default function SwaggerPage() {
  const uiRef = useRef();

  useEffect(() => {
    if (uiRef.current) {
      SwaggerUI({
        domNode: uiRef.current,
        url: '/api/swagger',  // API route để lấy spec của Swagger
      });
    }
  }, []);

  return (
    <div>
      <div ref={uiRef} />
    </div>
  );
}