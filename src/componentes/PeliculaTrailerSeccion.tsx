import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Pelicula } from '../modelos/peliculas';
import TabPanel from './TabPanel';

interface Props {
  pelicula: Pelicula;
}

const PeliculaTrailerSeccion = (props: Props) => {
  const { pelicula } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };
  return (
    <>
      <Divider>
        <Typography variant="h5" fontWeight={900} margin={5}>
          Trailler
        </Typography>
      </Divider>
      <Grid container justifyContent="center">
        <Grid item margin={5}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              {pelicula.videos
                ? pelicula.videos.map((video: any) => (
                    <Tab
                      key={video.id}
                      label={video.published_at.split('T')[0]}
                    />
                  ))
                : ''}
            </Tabs>
          </Box>

          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            {pelicula.videos
              ? pelicula.videos.map((video: any, index) => (
                  <TabPanel
                    key={`video_${video.id}`}
                    value={value}
                    index={index}
                  >
                    <Typography margin={2} fontWeight={900}>
                      {video.name}
                    </Typography>
                    <iframe
                      width="900"
                      height="500"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </TabPanel>
                ))
              : ''}
          </SwipeableViews>
        </Grid>
      </Grid>
    </>
  );
};

export default PeliculaTrailerSeccion;
