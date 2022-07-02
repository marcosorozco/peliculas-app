import { AxiosObservable } from 'axios-observable';
import axiosIntance from '.';
import { ResponseSuccess } from '../modelos';
import { Comentario } from '../modelos/peliculas';

export const getComentarios = (
  peliculaId: number
): AxiosObservable<ResponseSuccess<{ comentarios: Comentario[] }>> => {
  return axiosIntance.get(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/${peliculaId}/comentarios`
  );
};

export const guardarComentarios = (
  peliculaId: number,
  comentario: Comentario
): AxiosObservable<ResponseSuccess<any>> => {
  return axiosIntance.post(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/${peliculaId}/comentarios`,
    comentario
  );
};
