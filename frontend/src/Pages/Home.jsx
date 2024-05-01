import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '../Componenets/Card';
import UpdateForm from '../Componenets/UpdateForm';
import AddForm from '../Componenets/AddForm';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const nav = useNavigate()
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://j-card.onrender.com/cards', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        setData(response.data.payload.cards);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsUpdateFormVisible(true);
  };

  const handleFormClose = () => {
    setIsUpdateFormVisible(false);
  };

  const handleAddFormOpen = () => {
    setIsAddFormVisible(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormVisible(false);
  };

  const handleAddFormSubmit = (newCard) => {
    setData([...data, newCard]);
    setIsAddFormVisible(false);
  };
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    toast.success('Logout Sucsesfull')
    nav('/')

  }
  const handleUpdateSubmit = (updatedCard) => {
    const updatedData = data.map((card) => {
      if (card._id === updatedCard._id) {
        return updatedCard;
      }
      return card;
    });
    setData(updatedData);
    setIsUpdateFormVisible(false);
  };

  const handleDelete = (deletedCardId) => {
    setData(data.filter(card => card._id !== deletedCardId));
  };
  return (
    <div className="h-full mx-auto px-4 py-8 flex flex-col items-center   "
//       style={{
//       background:"url('bg.jpg')",
//       backgroundRepeat:'no-repeat',
//       backgroundSize:'cover'
//   }}
    >
      <div className='flex text-white glass justify-between items-center mb-4 w-5/6 backdrop-blur-sm p-3 rounded-full'>
        <h1 className="text-3xl font-bold  ">Cards</h1>
        <button className='bg-gray-500 text-white p-2 px-4 rounded-md' onClick={handleAddFormOpen}>Add new Card</button>
        <button className='border-gray-100 border-2 hover:bg-gray-500 hover:text-white text-gray-100 p-2 px-4 rounded-md' onClick={handlelogout}>Logout</button>
      </div>
      {
        data.length === 0 &&
        <div className="  w-5/6  flex items-center justify-center">
            <h1 className='text-3xl text-white'>Hi, Add Your Cards Here</h1>
        </div> 
      }
      <div className="  w-5/6  flex items-center gap-5  flex-wrap">
        {data.map((card, index) => (
          <Card key={index} card={card} onCardClick={handleCardClick} />
        ))}
      </div>
      <AnimatePresence>
        {isUpdateFormVisible && (
          <motion.div
            initial={{ opacity: 0,   }}
            animate={{ opacity: 1,  }}
            exit={{ opacity: 0,  }}
            transition={{ duration: 0.5 }}
          >
            <UpdateForm card={selectedCard} onClose={handleFormClose} onDelete={handleDelete} onUpdate={handleUpdateSubmit} />
          </motion.div>
        )}
        {isAddFormVisible && (
          <motion.div
            initial={{ opacity: 0,   }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0,   }}
            transition={{ duration: 0.5 }}
          >
            <AddForm onClose={handleAddFormClose} onAdd={handleAddFormSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
