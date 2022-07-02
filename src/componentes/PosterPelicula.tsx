import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Pelicula, PeliculaPeriodoPrecio } from '../modelos/peliculas';
import CardPelicula from './CardPelicula';
import PanToolIcon from '@mui/icons-material/PanTool';
import {
  guardarRentaPelicula,
  guardarVotacionPelicula,
} from '../services/peliculas';
import { useSnackbar } from 'notistack';
import { MessageData } from '../modelos/message';
import CreditScoreIcon from '@mui/icons-material/CreditCard';

interface Props {
  pelicula: Pelicula;
  disableMore?: boolean;
}

const peliculaPeriodoPrecioInicial: PeliculaPeriodoPrecio = {
  periodo_id: 0,
  precio: 0,
  precio_total: 0,
  tiempo: 0,
};

const PosterPelicula = (props: Props) => {
  const { pelicula, disableMore } = props;
  const [estrellas, setEstrellas] = useState<number>(5);
  const [peliculaPeriodoPrecio, setPeliculaPeriodoPrecio] =
    useState<PeliculaPeriodoPrecio>(peliculaPeriodoPrecioInicial);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box
      key={pelicula.id}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) 150px, rgba(31.5, 10.5, 10.5, 0.84) 100%), url(${process.env.NEXT_PUBLIC_IMAGE_BACK}${pelicula.peliculasPoster[1].path})`,
      }}
    >
      <Grid
        container
        sx={{
          minHeight: '600px',
          color: 'white',
          justifyContent: 'center',
        }}
        alignContent="center"
        alignItems="center"
      >
        <Grid container item xs={10} spacing={0}>
          <Grid item xs={12} sm={4}>
            <CardPelicula pelicula={pelicula} />
          </Grid>
          <Grid container item xs={12} sm={8}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  margin: 0,
                  padding: 0,
                  fontWeight: 700,
                  fontSize: '1.7em',
                  textDecoration: 'none',
                  fontFamily: 'sans-serif',
                  height: '50px',
                }}
              >
                {pelicula.titulo} ({pelicula.fecha_lanzamiento.split('-')[0]})
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="body1">Valoracion</Typography>
              <Rating
                name="read-only"
                value={pelicula.estrellas_promedio}
                readOnly
                size="large"
              />
            </Grid>
            <Grid item sm={12}>
              <Typography variant="inherit" sx={{ fontSize: '1.3em' }}>
                {pelicula.descripcion}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              {!disableMore ? (
                <Link
                  href={`/pelicula/${pelicula.id}`}
                  underline="none"
                  sx={{ fontSize: '1.3em', color: 'white' }}
                >
                  Ver Mas...
                </Link>
              ) : (
                ''
              )}
            </Grid>
            <Grid item sm={12}>
              <Typography variant="body1">Votar</Typography>
              <Rating
                name="read-only"
                value={estrellas}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setEstrellas(newValue);
                  }
                }}
                size="large"
              />
              <Tooltip title="Votar">
                <IconButton
                  onClick={() => {
                    guardarVotacionPelicula(pelicula.id, estrellas).subscribe({
                      next: () => {
                        enqueueSnackbar('Tu votacion fue guardada con exito', {
                          variant: 'success',
                        });
                      },
                      error: (error: MessageData) => {
                        enqueueSnackbar(
                          `Error al guardar la votacion (${error.message})`,
                          {
                            variant: 'error',
                          }
                        );
                      },
                    });
                  }}
                >
                  <PanToolIcon sx={{ color: 'white', fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid container item sm={12} spacing={1}>
              {pelicula.periodos ? (
                <>
                  <Grid item sm={3}>
                    <Typography variant="h6">Periodo</Typography>
                    <TextField
                      select
                      value={peliculaPeriodoPrecio.periodo_id}
                      fullWidth
                      onChange={(event) => {
                        const periodo_id = Number(event.target.value);
                        const periodoPrecioPrecio =
                          pelicula.peliculaPeriodosPrecio.find(
                            (peliculaPeriodoPrecio) =>
                              peliculaPeriodoPrecio.periodo_id == periodo_id
                          );
                        setPeliculaPeriodoPrecio({
                          ...peliculaPeriodoPrecioInicial,
                          periodo_id,
                          precio: Number(periodoPrecioPrecio.precio),
                        });
                        console.log('periodoPrecioPrecio', periodoPrecioPrecio);
                      }}
                      sx={{ background: 'white', borderRadius: 5 }}
                    >
                      {pelicula.periodos.map((periodo) => (
                        <MenuItem key={periodo.id} value={periodo.id}>
                          {periodo.descripcion}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sm={3}>
                    <Typography variant="h6">Costo por Periodo</Typography>
                    <TextField
                      value={peliculaPeriodoPrecio.precio}
                      fullWidth
                      disabled={true}
                      onChange={() => {}}
                      sx={{ background: 'white', borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <Typography variant="h6">Tiempo a prestar</Typography>
                    <TextField
                      value={peliculaPeriodoPrecio.tiempo}
                      fullWidth
                      onChange={(event) => {
                        const tiempo = Number(event.target.value);
                        setPeliculaPeriodoPrecio({
                          ...peliculaPeriodoPrecio,
                          tiempo,
                          precio_total: peliculaPeriodoPrecio.precio * tiempo,
                        });
                      }}
                      sx={{ background: 'white', borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <Typography variant="h6">Total a Pagar</Typography>
                    <TextField
                      value={peliculaPeriodoPrecio.precio_total}
                      fullWidth
                      sx={{ background: 'white', borderRadius: 5 }}
                    />
                  </Grid>
                </>
              ) : (
                ''
              )}
            </Grid>
            <Grid item sm={12}>
              {pelicula.periodos ? (
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    guardarRentaPelicula(
                      pelicula.id,
                      peliculaPeriodoPrecio
                    ).subscribe({
                      next: () => {
                        enqueueSnackbar('Renta exitosa, disfruta tu pelicula', {
                          variant: 'success',
                        });
                        setPeliculaPeriodoPrecio(peliculaPeriodoPrecioInicial);
                      },
                      error: (error: MessageData) => {
                        enqueueSnackbar(
                          `Error al guardar la votacion (${error.message})`,
                          {
                            variant: 'error',
                          }
                        );
                      },
                    });
                  }}
                  endIcon={<CreditScoreIcon />}
                >
                  Rentar
                </Button>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PosterPelicula;
