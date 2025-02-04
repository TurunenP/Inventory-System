import { useState } from 'react';
import AddItemForm from '../AdminComponents/AddItemForm';
import ItemList from '../ItemList/ItemList';

const Items = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const role = storedUser?.role;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center align-center mb-10 ">
        <h1 className="text-2xl text-black font-bold mb-6 text-center">
          ROBO LAB EQUIPMENTS
        </h1>
       
      </div>

      <ItemList />
    </div>
  );
};

export default Items;
