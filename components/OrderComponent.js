import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    marginTop: theme.spacing(5)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

const RenderTextField = props => {
  return (
    <TextField
      {...props}
      variant="outlined"
      style={{ margin: '10px 0' }}
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

const YourAddress = ({ classes = {} }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Name</h4>
        <FormControl fullWidth required>
          <RenderTextField required name="name" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Address</h4>
        <FormControl fullWidth required>
          <RenderTextField required name="name" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Phone</h4>
        <FormControl fullWidth required>
          <RenderTextField required name="name" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Email</h4>
        <FormControl fullWidth required>
          <RenderTextField required name="name" />
        </FormControl>
      </Grid>
    </Grid>
  );
};

function getSteps() {
  return ['Your Address', 'Payment and Buy', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <YourAddress />;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export default function OrderComponent() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </Container>
  );
}
