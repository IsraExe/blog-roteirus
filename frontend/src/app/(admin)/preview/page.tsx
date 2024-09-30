'use client';

import { useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

const Preview = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const content = sessionStorage.getItem('content');

      if (content) containerRef.current.innerHTML = content;
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16'>
      <div className='mt-16' ref={containerRef} />
    </div>
  );
};

export default Preview;
