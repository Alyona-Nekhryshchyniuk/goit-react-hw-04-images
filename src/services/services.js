import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

export function getApiImages(searchQuery, page) {
  return axios.get('/', {
    params: {
      q: searchQuery,
      page: page,
      key: '32103047-74f71fbf2b590f3c03f09df5a',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
}
