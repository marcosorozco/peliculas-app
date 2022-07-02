import { Card, CardMedia } from '@mui/material';
import { Pelicula } from '../modelos/peliculas';

interface Props {
  pelicula: Pelicula;
}

const CardPelicula = (props: Props) => {
  const { pelicula } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        style={{ width: '350px' }}
        image={`https://www.themoviedb.org/t/p/original/${pelicula.peliculasPoster[0].path}`}
        alt={pelicula.titulo}
      />
    </Card>
  );
};

export default CardPelicula;
