import Axios from 'axios-observable';
import { handleError } from '../utils/handleError';

const instance = Axios.create({
  timeout: 1000 * 60 * 1, // NOSONAR
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const formatError = handleError(error);
    return Promise.reject(formatError);
  }
);

export default instance;
