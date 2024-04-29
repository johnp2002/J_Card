import React, { useEffect, useState } from 'react';
import Visa from '../assets/Visa';
import Sbi from '../assets/State Bank of India'
const ProjectComponent = ({card ,onCardClick}) => {
    console.log(card)
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
            onClick={handleCardClick}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-6 w-96 h-64 card   cursor-pointer bg-gray-800 bg-opacity-30 rounded-xl relative overflow-hidden  glass  ">
            {/* Dummy Card Name */}
            <div className="absolute bottom-3 left-3 text-white font-semibold text-sm">{card.type  }</div>
            {/* Dummy Card Type */}
            <div className="absolute top-3 right-3 text-white font-semibold text-xs">
            {card.issuer  == 'Visa'&& <Visa  width="60px" height="50px" className="opacity-50 fill-white" />}
                {card.issuer  == 'State Bank of India'&& <Sbi  width="50px" height="40px" className="opacity-50 fill-white" />}
                </div>
            {/* issued date */}
            <div>
                <p className='text-white'>{new Date(card.issuedDate).toLocaleDateString()}</p>
            </div>
            {/* card number  */}
            <div className='absolute bottom-20 -ml-3 font-mono text-gray-200 text-2xl'>
                <h1 className='tracking-wider font-black'>{card.number}</h1>
            </div>
            <div className='absolute bottom-12 -ml-3 opacity-50 text-white text-2xl'>
                <h1>{card.name}</h1>
            </div>
            <div className="absolute bottom-0 right-0 p-2 transform"></div>
            {/* Glow effect */}
            <div className="glow absolute inset-0 bg-black bg-opacity-0"></div>
        </div>
    );
};

export default ProjectComponent;















// // components/Card.js
// import React from 'react';
// const Card = ({ card }) => {
//   return (
// <div className="p-6 w-80 h-52 card bg-gray-800 bg-opacity-75 rounded-xl relative overflow-hidden transform   transition duration-300">
//   {/* Dummy Card Name */}
//   <div className="absolute bottom-3 left-3 text-white font-semibold text-sm">{card.type}</div>
//   {/* Dummy Card Type */}
//   <div className="absolute top-3 right-3 text-white font-semibold text-xs">{card.issuer}</div>
//   {/* issued date */}
//   <div>
//     <p>{new Date(card.issuedDate).toLocaleDateString()}</p>
//   </div>
//   {/* card number  */}
//   <div className='absolute bottom-12 -ml-3 font-mono text-white text-2xl'>
//     <h1>{card.number}</h1>
//   </div>
//   <div className="absolute bottom-0 right-0 p-2 transform"></div>
//   {/* Glow effect */}
//   <div className="glow absolute inset-0 bg-black bg-opacity-0"></div>
// </div>
//   );
// };

// export default Card;
