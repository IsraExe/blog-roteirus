import { useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

const Preview = () => {
    
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) containerRef.current.innerHTML = sessionStorage.getItem('content');
    }, [containerRef])

    return(
        
        <div ref={containerRef} />
        
    );

}

export default Preview;
