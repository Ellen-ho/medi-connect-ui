import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    get Authorization() {
      const auth = localStorage.getItem('auth');
      return `Bearer ${auth ? JSON.parse(auth).token : ''}`;
    },
  },
  baseURL: 'http://localhost:10000/api',
});

api.interceptors.response.use(
  (response) => {
    toast.success('Request successful!');
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(`${error.response.data.message}`);
    } else if (error.request) {
      toast.error('Request was made but no response was received');
    } else {
      toast.error(`Something went wrong: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

export default api;
