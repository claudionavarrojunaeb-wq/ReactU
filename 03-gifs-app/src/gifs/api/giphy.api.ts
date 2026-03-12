import axios from 'axios';

export const giphyApi = axios.create({
    baseURL:'https://api.giphy.com/v1/gifs',
    timeout: 10000, // Request will time out after 10 seconds
    params:{
        lang:'es',
        api_key: import.meta.env.VITE_GIPHY_API_KEY,
    },
});