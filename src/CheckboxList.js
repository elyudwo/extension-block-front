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

}


export default CheckboxList;