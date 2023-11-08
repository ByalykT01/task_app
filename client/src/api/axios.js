import axios from 'axios'

let baseURL = '';

  if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000';
  } else {
    baseURL = 'https://task-app-byalykt.onrender.com'; 
  }
export default axios.create({
baseURL
})