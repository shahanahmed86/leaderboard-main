import axios from 'axios';

const apiRequest = ({ url, method, data }) => axios({ method, url, data });

export default apiRequest;
