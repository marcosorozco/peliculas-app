import { CircularProgress, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardPeliculaBusqueda from '../../src/componentes/CarPeliculaBusqueda';
import { Pelicula } from '../../src/modelos/peliculas';
import { getPeliculasBusqueda } from '../../src/services/peliculas';

const Busqueda = () => {
  const route = useRouter();
  const { search } = route.query;
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeliculasBusqueda({
      sortByEstrellas: true,
      sortByRentas: false,
      paginate: 10,
      query: String(search),
    }).subscribe({
      next: ({ data }) => {
        if (data.resultado?.peliculas) {
          setPeliculas(data.resultado?.peliculas);
          setLoading(false);
        }
      },
      error: () => {
        setPeliculas([]);
        setLoading(false);
      },
    });
  }, []);

  return (
    <>
      <Grid container mt={4}>
        <Grid item sm={2}></Grid>
        <Grid item sm={10}>
          <Typography variant="h5" mb={3}>
            Coincidencias encontradas ({peliculas.length})
          </Typography>
          <Grid container>
            {loading ? (
              <Grid sm={12} justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              peliculas.map((pelicula) => (
                <Grid key={`buscador_${pelicula.id}`} item margin={1}>
                  <CardPeliculaBusqueda pelicula={pelicula} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Busqueda;
