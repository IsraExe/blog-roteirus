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
        <div ref={containerRef} />
    );
}

export default Preview;
