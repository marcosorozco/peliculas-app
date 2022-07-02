import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, MobileStepper, useTheme } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Pelicula } from '../modelos/peliculas';
import PosterPelicula from './PosterPelicula';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Props {
  peliculas: Pelicula[];
}

const PosterSlider = (props: Props) => {
  const theme = useTheme();
  const { peliculas } = props;
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = peliculas.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ minHeight: '600px' }}>
      <Box>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {peliculas.map((pelicula) => (
            <PosterPelicula key={pelicula.id} pelicula={pelicula} />
          ))}
        </AutoPlaySwipeableViews>
        <Box sx={{ background: 'red', width: '100vw' }}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PosterSlider;
