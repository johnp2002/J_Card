// import React from 'react';
// import AuthForm from '../Componenets/AuthForm';
// import Visa from '../assets/Visa';
// import Amex from '../assets/Amex';
// const Dashboard = () => {
//   const handleLoginSubmit = (data) => {
//     // Implement login logic here
//     console.log('Login data:', data);
//   };

//   const handleRegisterSubmit = (data) => {
//     // Implement register logic here
//     console.log('Register data:', data);
//   };

//   return (
//     <div className="flex justify-center items-center   h-screen  "

//     >
//       <div className="w-full max-w-5xl flex justify-center   p-2 rounded-xl">
//         {/* Hero Section */}
//         <div className="w-1/2"> 
//             <div className='w-80 h-52 bg-black bg-opacity-25 backdrop-blur-md rounded-xl -rotate-2'>
//             {/* card 1 */}
//             <div className='flex justify-end pr-5'>

//                 <Visa width='80px' height='300px' className='fill-white opacity-25' />
//                 </div>
//             </div>
//             {/* card 2 */}
//             <div className='w-80 h-52 bg-white bg-opacity-25 backdrop-blur-md rounded-xl -mt-6 rotate-3 shadow-inner'>
//                 <div className='flex justify-end pr-5'>

//                 <Amex width='60px' height='300px' className='  opacity-50 ' />
//                 </div>
//             </div>

//         </div>

//         {/* Sign-up and Login Forms */}
//         <div className="w-1/2">
//           <AuthForm onSubmit={handleLoginSubmit} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React from 'react';
import AuthForm from '../Componenets/AuthForm';
import Visa from '../assets/Visa';
import Amex from '../assets/Amex';
import Card from '../Componenets/UseCard'

const Dashboard = () => {
    const handleLoginSubmit = (data) => {
        // Implement login logic here
        console.log('Login data:', data);
    };

    const handleRegisterSubmit = (data) => {
        // Implement register logic here
        console.log('Register data:', data);
    };

    return (
        <div className='bg-gray-100 bg-gradient-to-t to-slate-800 '
        style={{
            background:"url('bg.jpg')",
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
        }}
        >

        <div  
        className="flex justify-center items-center h-screen bg-opacity-20 backdrop-blur"
        >
            <div className="w-full max-w-5xl flex justify-center p-2 rounded-xl     ">
                {/* Card Section */}
                <div className="w-1/2">
                    {/* Card 1 */}
                    <Card>

                        <div className="w-80 h-52 bg-gray-800 bg-opacity-75 backdrop-blur-md rounded-xl -rotate-2 relative overflow-hidden">
                            {/* Dummy Card Name */}
                            <div className="absolute bottom-3 left-3 text-white font-semibold text-sm">Visa</div>
                            {/* Dummy Card Type */}
                            <div className="absolute top-3 right-3 text-white font-semibold text-xs">Credit</div>
                            {/* SVG Icon */}
                            <div className="absolute bottom-0 right-0 p-2 transform -rotate-12">
                                <Visa width="80px" height="50px" className="fill-white opacity-50" />
                            </div>
                            {/* Glow effect */}
                            <div className="glow absolute inset-0 bg-black bg-opacity-0"></div>
                        </div>
                    </Card>
                    {/* Card 2 */}
                    <Card>

                        <div className="w-80 h-52 bg-amber-500 bg-opacity-75 backdrop-blur-md rounded-xl -mt-6 rotate-3 shadow-inner relative overflow-hidden">
                            {/* Dummy Card Name */}
                            <div className="absolute bottom-3 left-3 text-gray-800 font-semibold text-sm">Amex</div>
                            {/* Dummy Card Type */}
                            <div className="absolute top-3 right-3 text-gray-800 font-semibold text-xs">Debit</div>
                            {/* SVG Icon */}
                            <div className="absolute bottom-0 right-0 p-2 transform rotate-12">
                                <Amex width="60px" height="50px" className="opacity-50" />
                            </div>
                            {/* Glow effect */}
                            <div className="glow absolute inset-0 bg-black bg-opacity-0"></div>
                        </div>
                    </Card> 
                </div>

                {/* Sign-up and Login Forms */}
                <div className="w-1/2">
                    <AuthForm onSubmit={handleLoginSubmit} />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
