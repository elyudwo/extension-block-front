import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckboxList.css';


const API_BASE_URL = 'http://assignment-env.eba-3kmurjqx.ap-northeast-2.elasticbeanstalk.com/v1';
const API_KEY = 'server';
const FIXED_ITEMS = ['bat', 'cmd', 'com', 'cpl', 'exe', 'scr', 'js'];

function CheckboxList() {
  const [checkedItems, setCheckedItems] = useState(new Array(FIXED_ITEMS.length).fill(false));
  const [customItem, setCustomItem] = useState('');
  const [customItems, setCustomItems] = useState([]);
  const [customBoxItems, setCustomBoxItems] = useState([]);
  const [numCustomItems, setNumCustomItems] = useState(0);

  useEffect(() => {
    fetchInitialCheckedItems();
  }, []);

  const fetchInitialCheckedItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/find/extension`, {
        headers: { 'key': API_KEY }
      });
      const existingExtensions = response.data;

      const initialCheckedItems = FIXED_ITEMS.map(item => existingExtensions.includes(item));
      setCheckedItems(initialCheckedItems);

      const filteredCustomItems = existingExtensions.filter(ext => !FIXED_ITEMS.includes(ext));
      setCustomItems(filteredCustomItems);
      setCustomBoxItems(filteredCustomItems);
      setNumCustomItems(filteredCustomItems.length);
    } catch (error) {
      console.error('Error fetching initial checked items:', error);
    }
  };

  const updateServerExtension = async (extension, method) => {
    try {
      if (method === 'PUT') {
        await axios.put(`${API_BASE_URL}/insert/extension`, { key: API_KEY, extension });
      } else if (method === 'DELETE') {
        await axios.delete(`${API_BASE_URL}/delete/extension`, {
          data: { key: API_KEY, extension }
        });
      }
    } catch (error) {
      console.error(`Error ${method === 'PUT' ? 'inserting' : 'deleting'} extension:`, error);
    }
  };

  const handleCheckboxChange = async (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const extension = FIXED_ITEMS[index];
    const method = newCheckedItems[index] ? 'PUT' : 'DELETE';
    await updateServerExtension(extension, method);
  };

  const handleCustomItemChange = (e) => {
    if (e.target.value.length <= 20) {
      setCustomItem(e.target.value);
    }
  };

  const handleAddCustomItem = async () => {
    if (customItem.trim() !== '' && customItems.length < 200) {
      const newCustomItem = customItem.trim();
      const updatedCustomItems = [...customItems, newCustomItem];
      setCustomItems(updatedCustomItems);
      setCustomBoxItems(updatedCustomItems);
      setCustomItem('');
      setNumCustomItems(updatedCustomItems.length);
      await updateServerExtension(newCustomItem, 'PUT');
    } else {
      alert('최대 200개의 확장자까지만 추가할 수 있습니다.');
    }
  };

  const handleRemoveCustomItem = async (index) => {
    const removedExtension = customItems[index];
    const updatedCustomItems = customItems.filter((_, i) => i !== index);
    setCustomItems(updatedCustomItems);
    setCustomBoxItems(updatedCustomItems);
    setNumCustomItems(updatedCustomItems.length);
    await updateServerExtension(removedExtension, 'DELETE');
  };

}


export default CheckboxList;