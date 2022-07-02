interface Response {
  readonly codigo: string;
  readonly mensaje: string;
  readonly folio: string;
}
export interface ResponseSuccess<T> extends Response {
  readonly resultado?: T;
}

export interface ResponseSuccessResultEstrict<T> extends Response {
  readonly resultado: T;
}

export interface ResponseError extends Response {
  readonly info: string;
  readonly detalles: string[] | any[]; // NOSONAR
}
