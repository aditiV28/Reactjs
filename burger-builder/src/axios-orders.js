import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-2943e-default-rtdb.firebaseio.com/'
});

export default instance;
