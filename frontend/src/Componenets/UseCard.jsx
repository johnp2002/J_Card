import React, { useEffect, useState } from 'react';

const ProjectComponent = ({children} ) => {
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    const handleCardClick = () => {
      setIsUpdateFormVisible(!isUpdateFormVisible);
      onCardClick(card); // Pass the card details to the parent component
    };
  
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);
    const [imgOffsetX, setImgOffsetX] = useState(0);

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const x = e.pageX - card.offsetLeft;
        const y = e.pageY - card.offsetTop;
        const px = x / card.offsetWidth;
        const py = y / card.offsetHeight;
        var xx = -15 + 30 * px,
            yy = 15 - 30 * py;

        setRotationY(xx);
        setRotationX(yy);
    }

    const handleGlobalMouseMove = (e) => {
        const px = e.clientX / window.innerWidth;
        const offsetX = -20 + 40 * px;
        setImgOffsetX(offsetX);
    }

    const handleMouseLeave = () => {
        setRotationY(0);
        setRotationX(0);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    return (
        <div
            style={{
                transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`
            }} 
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleMouseLeave}
            className="  "
        >
            {children}
            {/* Glow effect */}
            <div className="glow absolute inset-0 bg-black bg-opacity-0"></div>
        </div>
    );
};

export default ProjectComponent;
