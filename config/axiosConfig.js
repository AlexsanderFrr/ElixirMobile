import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elixir-backend-60fb.onrender.com', // Substitua pela URL correta do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
