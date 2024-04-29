import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UpdateForm = ({ card, onClose, onDelete, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:4000/cards/${card._id}`, data, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log('Card updated successfully:', response.data);
      onUpdate(response.data.payload.card)
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error('Error updating card:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/cards/${card._id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      onDelete(card._id); // Pass card id to parent for deletion from state
      onClose(); // Close the form after successful deletion
    } catch (error) {
      console.error('Error deleting card:', error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg glass text-white">
        <h2 className="text-2xl font-bold mb-4">Update Card</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold mb-1">Type:</label>
            <input {...register('type')} id="type" type="text" defaultValue={card.type} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="issuer" className="block text-sm font-semibold mb-1">Issuer:</label>
            <input {...register('issuer')} id="issuer" type="text" defaultValue={card.issuer} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-semibold mb-1">Number:</label>
            <input {...register('number')} id="number" type="text" defaultValue={card.number} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="issuedDate" className="block text-sm font-semibold mb-1">Issued Date:</label>
            <input {...register('issuedDate')} id="issuedDate" type="date" defaultValue={card.issuedDate} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-semibold mb-1">Expiry Date:</label>
            <input {...register('expiryDate')} id="expiryDate" type="date" defaultValue={card.expiryDate} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
            <input {...register('name')} id="name" type="text" defaultValue={card.name} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="text-right">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
            <button type="button" onClick={() => setConfirmDelete(true)} className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
        {confirmDelete && (
          <div className="mt-4">
            <p className="text-red-500">Are you sure you want to delete this card?</p>
            <div className="flex justify-end mt-2">
              <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Confirm Delete</button>
              <button onClick={() => setConfirmDelete(false)} className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
