"use client"
import React, { useState, useEffect } from 'react';

const Form: React.FC = () => {
  const [allData, setAllData] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("data");
    if (dataFromStorage) {
      setAllData(JSON.parse(dataFromStorage));
    }
  }, []);

  const Handlename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const Handlelastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const HandleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    
    if (!name.trim() || !lastname.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (updateIndex === -1) {
      const newList = {
        name: name,
        lastname: lastname,
        email: email,
        show: false,
      };
      const newData = [...allData, newList];
      localStorage.setItem("data", JSON.stringify(newData));
      setAllData(newData);
      setName("");
      setLastname("");
      setEmail("");
      alert("Data saved successfully");
    } else {
      const updatedData = [...allData];
      updatedData[updateIndex] = { name, lastname, email, show: false };
      localStorage.setItem("data", JSON.stringify(updatedData));
      setAllData(updatedData);
      setName("");
      setLastname("");
      setEmail("");
      setUpdateIndex(-1);
      alert("Data updated successfully");
    }
  };
  const handleDelete = (index: number) => {
    const newData = [...allData];
    newData.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(newData));
    setAllData(newData);
  };

  const handleUpdate = (index: number) => {
    const itemToUpdate = allData[index];
    setName(itemToUpdate.name);
    setLastname(itemToUpdate.lastname);
    setEmail(itemToUpdate.email);
    setUpdateIndex(index);
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block">First Name:</label>
          <input
            type="text"
            onChange={Handlename}
            value={name}
            id="firstName"
            name="firstName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block">Last Name:</label>
          <input
            type="text"
            id="lastName"
            onChange={Handlelastname}
            value={lastname}
            name="lastName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            onChange={HandleEmail}
            value={email}
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            style={{ color: 'black' }}
          />
        </div>
        <button type="submit" onClick={HandleShow} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      </form>

      {allData && allData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-8">
          {allData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="px-4 py-2" onClick={() => handleUpdate(index)}>
                <div className="text-gray-700 font-bold text-lg mb-2">Name: {item.name}</div>
                <p className="text-gray-700 text-sm mb-2">Last Name: {item.lastname}</p>
                <p className="text-gray-700 text-sm mb-4">Email: {item.email}</p>
              </div>
              <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 mb-4 rounded-full">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;
