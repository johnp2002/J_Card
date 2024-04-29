import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddForm = ({ onClose, onAdd }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Array of popular card types
  const cardTypes = ['Credit Card', 'Debit Card', 'Prepaid Card', 'Gift Card'];

  // Array of popular issuers
  const issuers = ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB'];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/cards', data, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      toast.success(response.message)
      console.log('Card added successfully:', response.data);
      onAdd(response.data.payload.card); // Pass newly added card to parent for updating state

      onClose(); // Close the form after successful addition
    } catch (error) {
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
      console.error('Error adding card:', error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg glass text-white">
        <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold mb-1">Type:</label>
            <select {...register('type', { required: true })} id="type" className="text-black border rounded px-3 py-2 w-full">
              {cardTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <span className="text-red-500">Type is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="issuer" className="block text-sm font-semibold mb-1">Issuer:</label>
            <select {...register('issuer', { required: true })} id="issuer" className="text-black border rounded px-3 py-2 w-full">
              {issuers.map((issuer, index) => (
                <option key={index} value={issuer}>{issuer}</option>
              ))}
            </select>
            {errors.issuer && <span className="text-red-500">Issuer is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-semibold mb-1">Number:</label>
            <input {...register('number', { required: true })} id="number" type="text" className="text-black border rounded px-3 py-2 w-full" />
            {errors.number && <span className="text-red-500">Number is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="issuedDate" className="block text-sm font-semibold mb-1">Issued Date:</label>
            <input {...register('issuedDate', { required: true })} id="issuedDate" type="date" className="text-black border rounded px-3 py-2 w-full" />
            {errors.issuedDate && <span className="text-red-500">Issued Date is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-semibold mb-1">Expiry Date:</label>
            <input {...register('expiryDate', { required: true })} id="expiryDate" type="date" className="text-black border rounded px-3 py-2 w-full" />
            {errors.expiryDate && <span className="text-red-500">Expiry Date is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
            <input {...register('name', { required: true })} id="name" type="text" className="text-black border rounded px-3 py-2 w-full" />
            {errors.name && <span className="text-red-500">Name is required</span>}
          </div>
          <div className="text-right">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add</button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const AddForm = ({ onClose, onAdd }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:4000/cards', data, {
//         headers: {
//           'Authorization': localStorage.getItem('token')
//         }
//       });
//       console.log('Card added successfully:', response.data);
//       onAdd(response.data.payload.card); // Pass newly added card to parent for updating state
//       onClose(); // Close the form after successful addition
//     } catch (error) {
//       console.error('Error adding card:', error.message);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label htmlFor="type" className="block text-sm font-semibold mb-1">Type:</label>
//             <input {...register('type', { required: true })} id="type" type="text" className="border rounded px-3 py-2 w-full" />
//             {errors.type && <span className="text-red-500">Type is required</span>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="issuer" className="block text-sm font-semibold mb-1">Issuer:</label>
//             <input {...register('issuer', { required: true })} id="issuer" type="text" className="border rounded px-3 py-2 w-full" />
//             {errors.issuer && <span className="text-red-500">Issuer is required</span>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="number" className="block text-sm font-semibold mb-1">Number:</label>
//             <input {...register('number', { required: true })} id="number" type="text" className="border rounded px-3 py-2 w-full" />
//             {errors.number && <span className="text-red-500">Number is required</span>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="issuedDate" className="block text-sm font-semibold mb-1">Issued Date:</label>
//             <input {...register('issuedDate', { required: true })} id="issuedDate" type="date" className="border rounded px-3 py-2 w-full" />
//             {errors.issuedDate && <span className="text-red-500">Issued Date is required</span>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="expiryDate" className="block text-sm font-semibold mb-1">Expiry Date:</label>
//             <input {...register('expiryDate', { required: true })} id="expiryDate" type="date" className="border rounded px-3 py-2 w-full" />
//             {errors.expiryDate && <span className="text-red-500">Expiry Date is required</span>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
//             <input {...register('name', { required: true })} id="name" type="text" className="border rounded px-3 py-2 w-full" />
//             {errors.name && <span className="text-red-500">Name is required</span>}
//           </div>
//           <div className="text-right">
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add</button>
//             <button type="button" onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddForm;
