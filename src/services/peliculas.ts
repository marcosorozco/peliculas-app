import { AxiosObservable } from 'axios-observable';
import axiosIntance from '.';
import { ResponseSuccess } from '../modelos';
import {
  Pelicula,
  PeliculaBusquedaRequest,
  PeliculaPeriodoPrecio,
  PeliculasPorBusquedaReques,
} from '../modelos/peliculas';

export const getPeliculas = (
  datos: PeliculaBusquedaRequest
): AxiosObservable<ResponseSuccess<{ peliculas: Pelicula[] }>> => {
  const queryParams = `?sort_by_estrellas=${
    datos.sortByEstrellas
  }&sort_by_rentas=${datos.sortByRentas}${
    datos.paginate ? `&paginate=${datos.paginate}` : ''
  }`;
  return axiosIntance.get(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}${queryParams}`
  );
};

export const getPeliculasBusqueda = (
  datos: PeliculasPorBusquedaReques
): AxiosObservable<ResponseSuccess<{ peliculas: Pelicula[] }>> => {
  const queryParams = `?sort_by_estrellas=${
    datos.sortByEstrellas
  }&sort_by_rentas=${datos.sortByRentas}${
    datos.paginate ? `&paginate=${datos.paginate}` : ''
  }`;
  return axiosIntance.get(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/buscar-peliculas/${datos.query}${queryParams}`
  );
};

export const getPelicula = (
  idPelicula: number
): AxiosObservable<ResponseSuccess<{ pelicula: Pelicula }>> => {
  return axiosIntance.get(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/${idPelicula}`
  );
};

export const guardarVotacionPelicula = (
  idPelicula: number,
  estrellas: number
): AxiosObservable<ResponseSuccess<any>> => {
  return axiosIntance.post(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/${idPelicula}/estrellas`,
    { estrellas }
  );
};

export const guardarRentaPelicula = (
  idPelicula: number,
  peliculaPeriodoPrecio: PeliculaPeriodoPrecio
): AxiosObservable<ResponseSuccess<any>> => {
  return axiosIntance.post(
    `${process.env.NEXT_PUBLIC_PATH_PELICULAS}/${idPelicula}/renta`,
    { ...peliculaPeriodoPrecio }
  );
};
