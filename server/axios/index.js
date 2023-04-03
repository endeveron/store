import axios from 'axios';

import { firstBaseUrl } from '../data.js';
import { secondBaseUrl } from '../data.js';

export const axiosFirstInstance = axios.create({
  baseURL: firstBaseUrl,
});

export const axiosSecondInstance = axios.create({
  baseURL: secondBaseUrl,
});
