export interface PeliculaPoster {
  path: string;
  tipo: number;
}

export interface Video {
  id: number;
  key: string;
  name: string;
}

export interface Comentario {
  id?: number;
  name: string;
  comentario: string;
  fecha: string;
}

export interface Pelicula {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_lanzamiento: string;
  estrellas_promedio: number;
  peliculasPoster: PeliculaPoster[];
  videos?: Video[];
  comentarios?: Comentario[];
}

export interface PeliculaBusquedaRequest {
  sortByEstrellas: boolean;
  sortByRentas: boolean;
  paginate?: number;
}

export type PeliculasPorBusquedaReques = {
  query: string;
} & PeliculaBusquedaRequest;

export interface PeliculaPeriodoPrecio {
  periodo_id: number;
  precio: number;
  precio_total: number;
  tiempo: number;
}
