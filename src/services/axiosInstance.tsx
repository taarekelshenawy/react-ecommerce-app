import axios from "axios";
const apiClient = axios.create({
  baseURL: 'https://ecommerce.routemisr.com/api/v1/',
});

export default apiClient ;