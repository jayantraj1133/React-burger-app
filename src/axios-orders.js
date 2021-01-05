import axios from 'axios';

const instance =axios.create({
    baseURL:'https://react-burger-app-350ca.firebaseio.com/'
});

export default instance;