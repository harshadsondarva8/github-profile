import axios, {AxiosInstance} from 'axios';

// Define the default base URL for the Axios instance
export const DefaultBaseURL: string = (() => {
  return 'https://api.github.com';
})();

// Create an Axios instance named "Comm" with default configuration
const Comm: AxiosInstance = axios.create({
  baseURL: DefaultBaseURL,
  timeout: 600000, // value in milliseconds
  headers: {
    Accept: 'application/json',
    // "Content-type": "application/json"
  },
});

export default Comm;
