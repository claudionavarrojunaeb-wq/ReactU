import axios from 'axios';
import type { GiphyResponse } from '../interfaces/giphy.response';

export const getGifsByQuery = async(query:string) =>{
    const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search',{
        params:{
            q:query,
            limit:10,
            lang:'es',
            api_key: 'hKr4IVcCFwXf90d8RcaXxwjTSzjDnJH4'
        }
    })
    console.log(response)
    //response.data.data[0].
    //fetch(`https://api.giphy.com/v1/gifs/search?api_key=hKr4IVcCFwXf90d8RcaXxwjTSzjDnJH4&q=${query}&limit=25&lang=en`)
}