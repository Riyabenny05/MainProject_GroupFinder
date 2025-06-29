// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your actual backend base URL
  withCredentials: true, // If you use cookies for auth
});

export default instance;
