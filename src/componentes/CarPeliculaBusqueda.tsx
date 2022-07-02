import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { Pelicula } from '../modelos/peliculas';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

interface Props {
  pelicula: Pelicula;
}

const CardPeliculaBusqueda = (props: Props) => {
  const { pelicula } = props;
  return (
    <Card sx={{ width: '220px', height: '530px', borderRadius: 5 }}>
      <CardMedia
        component="img"
        sx={{ width: '220px' }}
        image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${pelicula.peliculasPoster[0].path}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="inherit" fontWeight={800} height={60} mb={1}>
          {`${pelicula.titulo}`}
        </Typography>
        <Typography variant="inherit" fontSize={12}>
          {`${pelicula.fecha_lanzamiento}`}
        </Typography>
        <Typography variant="body2" fontWeight={800} color="text.secondary">
          <Rating
            name="read-only"
            value={pelicula.estrellas_promedio}
            readOnly
            size="large"
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Tooltip title="Rentar">
          <IconButton aria-label="add to favorites">
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="ver mas">
          <IconButton aria-label="share">
            <Link href={`/pelicula/${pelicula.id}`}>
              <VisibilityIcon />
            </Link>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default CardPeliculaBusqueda;
