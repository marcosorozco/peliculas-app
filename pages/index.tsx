import { Box } from '@mui/material';
import type { NextPage } from 'next';
import PeliculasPrincipales from '../src/componentes/PeliculasPrincipales';
import PosterSlider from '../src/componentes/PosterSlider';
import { Pelicula } from '../src/modelos/peliculas';
import { getPeliculas } from '../src/services/peliculas';

const Home: NextPage<{ peliculas: Pelicula[] }> = ({
  peliculas,
}: {
  peliculas: Pelicula[];
}) => {
  return (
    <Box>
      <PosterSlider peliculas={peliculas} />
      <PeliculasPrincipales />
    </Box>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  /* const res = await fetch(`https://.../data`);
  const data = await res.json(); */

  // Pass data to the page via props
  const peliculas: Pelicula[] = await new Promise((resolve) => {
    getPeliculas({
      sortByEstrellas: true,
      sortByRentas: false,
      paginate: 5,
    }).subscribe({
      next: ({ data }) => {
        if (data.resultado?.peliculas) {
          resolve(data.resultado?.peliculas);
        }
      },
      error: () => {
        resolve([]);
      },
    });
  });
  return { props: { peliculas } };
}

export default Home;
