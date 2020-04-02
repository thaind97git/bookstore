import React from 'react';
import {
  Container,
  Grid,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button,
  Paper,
  CardActions,
  Card,
  CardContent,
  Link
} from '@material-ui/core';
import { connect } from 'react-redux';
import { TOAST_ERROR, TOAST_SUCCESS } from '../enums/actions';
import { createStructuredSelector } from 'reselect';
import { saveOrder } from '../stores/OrderState';
import moment from 'moment';
import MaterialTable from 'material-table';
import { formatDisplayNumber } from '../utils';

const cardSelector = state => state.shopingCart;

const connectToRedux = connect(
  createStructuredSelector({
    yourCard: cardSelector
  }),
  dispatch => ({
    displayToast: (message, type = TOAST_SUCCESS) =>
      dispatch({
        type: type,
        notification: {
          message
        }
      }),
    createNewOrder: object => dispatch(saveOrder(object))
  })
);

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
  },
  labelMargin: {
    marginBottom: 0
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

const YourAddress = ({ classes = {}, objectOrder, setObjectOrder }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Name</h4>
        <FormControl fullWidth required>
          <RenderTextField
            value={objectOrder.customerName}
            onChange={event => {
              const value = event.target.value;
              setObjectOrder(prev => ({
                ...prev,
                customerName: value
              }));
            }}
            required
            name="name"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Address</h4>
        <FormControl fullWidth required>
          <RenderTextField
            value={objectOrder.customerAddress}
            onChange={event => {
              const value = event.target.value;
              setObjectOrder(prev => ({
                ...prev,
                customerAddress: value
              }));
            }}
            required
            name="address"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Phone</h4>
        <FormControl fullWidth required>
          <RenderTextField
            value={objectOrder.customerPhoneNumber}
            onChange={event => {
              const value = event.target.value;
              setObjectOrder(prev => ({
                ...prev,
                customerPhoneNumber: value
              }));
            }}
            required
            name="phone"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Email</h4>
        <FormControl fullWidth required>
          <RenderTextField
            value={objectOrder.customerEmail}
            onChange={event => {
              const value = event.target.value;
              setObjectOrder(prev => ({
                ...prev,
                customerEmail: value
              }));
            }}
            required
            name="email"
            type="email"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Your Note</h4>
        <FormControl fullWidth required>
          <RenderTextField
            value={objectOrder.note}
            onChange={event => {
              const value = event.target.value;
              setObjectOrder(prev => ({
                ...prev,
                note: value
              }));
            }}
            required
            name="note"
            type="text"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
const YourPayment = ({ classes = {} }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Payment</h4>
        <FormControlLabel
          control={<Checkbox checked={true} readOnly name="checkedA" />}
          label="Cash payment on delivery"
        />
      </Grid>
      <Grid item xs={12}>
        <h4 className={classes.labelMargin}>Form of delivery</h4>
        <FormControlLabel
          control={<Checkbox checked={true} readOnly name="checkedA" />}
          label="Expected delivery in 1 week"
        />
      </Grid>
    </Grid>
  );
};

const YourInformation = ({ objectOrder, cartItems }) => {
  const totalPrice = cartItems
    ? cartItems.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0)
    : 0;
  console.log({ cartItems });
  return (
    <Grid container>
      <Grid item xs={12}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>Your name:</ListItemIcon>
            <ListItemText
              style={{ padding: '0 16px' }}
              primary={objectOrder.customerName}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Your address:</ListItemIcon>
            <ListItemText
              style={{ padding: '0 16px' }}
              primary={objectOrder.customerAddress}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Your email:</ListItemIcon>
            <ListItemText
              style={{ padding: '0 16px' }}
              primary={objectOrder.customerEmail}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Your phone number:</ListItemIcon>
            <ListItemText
              style={{ padding: '0 16px' }}
              primary={objectOrder.customerPhoneNumber}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Your note:</ListItemIcon>
            <ListItemText
              style={{ padding: '0 16px' }}
              primary={objectOrder.note}
            />
          </ListItem>
          <Card elevation={0}>
            <CardContent style={{ padding: 0 }}>
              <MaterialTable
                components={{
                  Container: props => <Paper {...props} elevation={0} />
                }}
                isLoading={false}
                title="Order's Items"
                data={cartItems || []}
                columns={[
                  {
                    title: 'Book',
                    field: 'isbn',
                    render: row => (
                      <Link href={`/book-details?isbn=${row.isbn}`}>
                        <a target="__blank">{row.isbn}</a>
                      </Link>
                    )
                  },
                  { title: 'Quantity', field: 'quantity', type: 'numeric' },
                  {
                    title: 'Price',
                    field: 'price',
                    type: 'currency'
                  }
                ]}
                options={{
                  actionsColumnIndex: -1,
                  emptyRowsWhenPaging: false,
                  paging: false,
                  search: false
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: 'No item in your cart'
                  },
                  header: {
                    actions: ''
                  }
                }}
              />
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Typography variant="h4" style={{ margin: '20px 10px 20px 0px' }}>
                Total: $ {Number(formatDisplayNumber(totalPrice)).toFixed(4)}
              </Typography>
            </CardActions>
          </Card>
        </List>
      </Grid>
    </Grid>
  );
};

function getSteps() {
  return ['Your Address', 'Payment and Buy', 'Confirm your information'];
}

function getStepContent({
  step,
  classes,
  objectOrder,
  setObjectOrder,
  cartItems
}) {
  switch (step) {
    case 0:
      return (
        <YourAddress
          classes={classes}
          objectOrder={objectOrder}
          setObjectOrder={setObjectOrder}
        />
      );
    case 1:
      return (
        <YourPayment
          classes={classes}
          objectOrder={objectOrder}
          setObjectOrder={setObjectOrder}
        />
      );
    case 2:
      return (
        <YourInformation cartItems={cartItems} objectOrder={objectOrder} />
      );
    default:
      return 'Unknown step';
  }
}

function OrderComponent({ displayToast, yourCard, createNewOrder }) {
  const cartItemsForInfo = (yourCard || []).map(cart => ({
    isbn: cart.isbn,
    quantity: cart.quantity,
    note: '',
    price: cart.price
  }));
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [objectOrder, setObjectOrder] = React.useState({
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    customerAddress: '',
    items: [],
    orderDate: '',
    note: ''
  });
  const steps = getSteps();

  const handleNext = () => {
    if (
      activeStep === 0 &&
      (!objectOrder.customerName ||
        !objectOrder.customerPhoneNumber ||
        !objectOrder.customerEmail ||
        !objectOrder.customerAddress)
    ) {
      displayToast('Please input full your information!', TOAST_ERROR);
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Container className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent({
                step: index,
                classes,
                objectOrder,
                setObjectOrder,
                cartItems: cartItemsForInfo
              })}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const cartItems = (yourCard || []).map(cart => ({
                isbn: cart.isbn,
                quantity: cart.quantity,
                note: ''
              }));
              const objectRequest = { ...objectOrder };
              objectRequest.items = cartItems;
              objectRequest.orderDate = moment(new Date()).format(
                'YYYY-MM-DDTHH:mm:ss'
              );
              createNewOrder(objectRequest);
            }}
            className={classes.button}
          >
            Click here to Order
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default connectToRedux(OrderComponent);
