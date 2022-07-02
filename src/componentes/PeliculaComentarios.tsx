import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Comentario, Pelicula } from '../modelos/peliculas';
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { getComentarios, guardarComentarios } from '../services/comentarios';
import { MessageData } from '../modelos/message';

interface Props {
  pelicula: Pelicula;
}

const COMENTARIOINICIAL: Comentario = {
  name: '',
  comentario: '',
  fecha: '',
};

const PeliculaComentario = (props: Props) => {
  const { pelicula } = props;
  const [comentario, setComentario] = useState<Comentario>(COMENTARIOINICIAL);
  const [comentarios, setComentarios] = useState<Comentario[] | null>(null);
  const [cargarComentarios, setCargarComentarios] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getComentarios(pelicula.id).subscribe({
      next: ({ data }) => {
        if (data.resultado?.comentarios) {
          setComentarios(data.resultado?.comentarios);
        }
      },
      error: (error: MessageData) => {
        enqueueSnackbar(`Comentarios no cargados (${error.message})`, {
          variant: 'error',
        });
        setComentarios([]);
      },
    });
  }, [cargarComentarios]);
  return (
    <>
      <Divider>
        <Typography variant="h5" fontWeight={900} margin={5}>
          Comentarios
        </Typography>
      </Divider>
      <Grid
        container
        justifyContent="center"
        margin={5}
        marginLeft={5}
        spacing={2}
      >
        <Grid item sm={8}>
          <TextField
            fullWidth
            id="outlined-name"
            label="Nombre"
            onChange={(event) => {
              setComentario({ ...comentario, name: event.target.value });
            }}
            value={comentario.name}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comentario"
            onChange={(event) => {
              setComentario({ ...comentario, comentario: event.target.value });
            }}
            value={comentario.comentario}
          />
        </Grid>
        <Grid item sm={8} sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => {
              guardarComentarios(pelicula.id, comentario).subscribe({
                next: () => {
                  setComentario(COMENTARIOINICIAL);
                  setCargarComentarios(!cargarComentarios);
                  enqueueSnackbar('Comentario registrado correctamente', {
                    variant: 'success',
                  });
                },
                error: (error: MessageData) => {
                  enqueueSnackbar(
                    `Comentarios no guardados (${error.message})`,
                    {
                      variant: 'error',
                    }
                  );
                },
              });
            }}
            endIcon={<PublishIcon />}
          >
            Publicar
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" margin={5} marginLeft={5}>
        {comentarios
          ? comentarios.map((comentario) => (
              <Grid
                key={`comentario_${comentario.id}`}
                item
                container
                sm={10}
                padding={2}
                marginBottom={2}
                sx={{ border: 1, borderRadius: 10 }}
              >
                <Grid item sm={2} justifyContent="flex-end">
                  <Typography>{comentario.fecha}</Typography>
                </Grid>
                <Divider orientation="vertical"></Divider>
                <Grid item sm={8} marginLeft={2}>
                  <Typography>{comentario.name}</Typography>
                  <Typography>{comentario.comentario}</Typography>
                </Grid>
              </Grid>
            ))
          : ''}
      </Grid>
    </>
  );
};

export default PeliculaComentario;
