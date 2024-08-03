import { useRef, useEffect } from 'react';

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
