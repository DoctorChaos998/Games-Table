import axios from 'axios'
import {apiKey} from './config'

const API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': apiKey
    }
})

export default api