import { Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Pelicula } from '../modelos/peliculas';
import { getPeliculas } from '../services/peliculas';
import BuscadorPeliculas from './BuscadorPeliculas';
import CardPeliculaBusqueda from './CarPeliculaBusqueda';

const PeliculasPrincipales = () => {
  useState(() => {
    getPeliculas({
      sortByEstrellas: true,
      sortByRentas: false,
      paginate: 10,
    }).subscribe({
      next: ({ data }) => {
        if (data.resultado?.peliculas) {
          setPeliculasEstrellas(data.resultado?.peliculas);
        }
      },
      error: () => {},
    });
  });
  useState(() => {
    getPeliculas({
      sortByEstrellas: false,
      sortByRentas: true,
      paginate: 10,
    }).subscribe({
      next: ({ data }) => {
        if (data.resultado?.peliculas) {
          setPeliculasRentas(data.resultado?.peliculas);
        }
      },
      error: () => {},
    });
  });
  const [peliculasEstrellas, setPeliculasEstrellas] = useState<Pelicula[]>([]);
  const [peliculasRentas, setPeliculasRentas] = useState<Pelicula[]>([]);
  return (
    <>
      <Divider>
        <Typography variant="h5" fontWeight={900}>
          Encuentra tu pelicula
        </Typography>
      </Divider>
      <Grid container justifyContent="center" margin={2} marginBottom={3}>
        <BuscadorPeliculas />
      </Grid>
      <Divider>
        <Typography variant="h5" fontWeight={900}>
          Mejor Valoradas
        </Typography>
      </Divider>
      <Grid
        key={`estrellas`}
        container
        margin={3}
        sx={{ justifyContent: 'center' }}
      >
        {peliculasEstrellas.map((pelicula: Pelicula) => (
          <Grid key={`estrellas_${pelicula.id}`} item xs={12} sm={2} margin={1}>
            <CardPeliculaBusqueda pelicula={pelicula} />
          </Grid>
        ))}
      </Grid>

      <Divider>
        <Typography variant="h5" fontWeight={900}>
          Mas rentadas
        </Typography>
      </Divider>
      <Grid
        key={`rentadas`}
        container
        margin={3}
        sx={{ justifyContent: 'center' }}
      >
        {peliculasRentas.map((pelicula: Pelicula) => (
          <Grid key={`rentadas_${pelicula.id}`} item xs={12} sm={2} margin={1}>
            <CardPeliculaBusqueda pelicula={pelicula} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PeliculasPrincipales;
