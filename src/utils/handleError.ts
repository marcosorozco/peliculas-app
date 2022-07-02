import { AxiosError } from 'axios';
import { ResponseError } from '../modelos';
import { MessageData } from '../modelos/message';

export const handleError = (error: AxiosError<ResponseError>): MessageData => {
  let details: string | undefined = '';

  const { response } = error;

  if (response) {
    const { detalles } = response.data;
    if (detalles) {
      if (typeof detalles[0] === 'object') {
        details = getDetails(Object.values(detalles[0]));
      } else {
        details = getDetails(detalles as string[]);
      }
    }
  }

  return {
    message: response?.data.mensaje || error.message,
    details: details || error.config.url,
    status: response?.status,
  };
};

const getDetails = (values: string[]): string | undefined => {
  return values.find((value) => !!value);
};
