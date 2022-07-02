import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PeliculaComentario from '../../src/componentes/PeliculaComentarios';
import PeliculaTrailerSeccion from '../../src/componentes/PeliculaTrailerSeccion';
import PosterPelicula from '../../src/componentes/PosterPelicula';
import { Pelicula } from '../../src/modelos/peliculas';
import { getPelicula } from '../../src/services/peliculas';

const PeliculaDetalle = () => {
  const route = useRouter();

  const { id } = route.query;
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  useEffect(() => {
    getPelicula(Number(id)).subscribe({
      next: ({ data }) => {
        if (data.resultado?.pelicula) {
          setPelicula(data.resultado.pelicula);
        }
      },
      error: () => {},
    });
  }, []);
  if (pelicula === null) {
    return (
      <Grid container justifyContent="center" marginTop={10}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <PosterPelicula
        key={pelicula.id}
        pelicula={pelicula}
        disableMore={true}
      />
      <PeliculaTrailerSeccion pelicula={pelicula} />
      <PeliculaComentario pelicula={pelicula} />
    </>
  );
};

export default PeliculaDetalle;
