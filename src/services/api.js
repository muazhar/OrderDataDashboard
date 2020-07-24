import axios from 'axios';

// Axios object to control the connection with the API
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export default api;
