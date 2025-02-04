// src/api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:5000/api/items', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
