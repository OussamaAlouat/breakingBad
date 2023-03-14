import axios from 'axios';

const breakingBadApi = axios.create({
  baseURL: 'https://api.breakingbadquotes.xyz/v1'
});


export default breakingBadApi;