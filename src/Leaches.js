// src/services/lichessService.js

import axios from 'axios';

const LichessAPI = axios.create({
  baseURL: 'https://lichess.org/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPublicGames = async () => {
  try {
    const response = await LichessAPI.get('/games');
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};
