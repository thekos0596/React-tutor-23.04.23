import axios from 'axios';

const API_KEY = '563492ad6f9170000100000145a0bdf3467e4f8fbd7fec0694446ed4';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const response = await axios.get(`search?query=${query}&page=${page}`);
  return response.data;
};
