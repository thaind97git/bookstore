import React from 'react';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import {
  Grid,
  TextField,
  CardContent,
  Card,
  Paper,
  Divider,
  CardActions,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import MaterialTable from 'material-table';
import Link from 'next/link';
import { formatDisplayNumber } from '../utils';

const RenderTextField = props => {
  return (
    <TextField
      {...props}
      variant="outlined"
      style={{ margin: '10px 0' }}
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

const CardOrderDetailsComponent = ({ orderDetails = {} }) => {
  const { items = [] } = orderDetails;
  const totalPrice = items
    ? items.reduce((prev, item) => {
        return prev + item.priceByOrder * item.quantity;
      }, 0)
    : 0;
  return (
    <CardSimpleLayout
      header={<b>Your order details</b>}
      body={
        <div>
          <Grid container>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Code"
                value={orderDetails.code}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Name"
                inputProps={{ readOnly: true }}
                value={orderDetails.customerName}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Email"
                inputProps={{ readOnly: true }}
                value={orderDetails.customerEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Phone number"
                inputProps={{ readOnly: true }}
                value={orderDetails.customerPhoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Address"
                inputProps={{ readOnly: true }}
                value={orderDetails.customerAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Order date"
                inputProps={{ readOnly: true }}
                value={moment(new Date(orderDetails.orderDate)).format(
                  'DD/MM/YYYY'
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Note"
                inputProps={{ readOnly: true }}
                value={orderDetails.note}
              />
            </Grid>
            <Grid item xs={12}>
              <RenderTextField
                disabled
                label="Status"
                inputProps={{ readOnly: true }}
                value={orderDetails.status}
              />
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardContent style={{ padding: 0 }}>
                  <MaterialTable
                    components={{
                      Container: props => <Paper {...props} elevation={0} />
                    }}
                    isLoading={false}
                    title="Order's Items"
                    data={orderDetails.items || []}
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
                        title: 'Price By Order',
                        field: 'priceByOrder',
                        type: 'currency'
                      },
                      {
                        title: 'Total Price',
                        field: '',
                        type: 'currency',
                        render: row =>
                          `$ ${Number(row.quantity) * Number(row.priceByOrder)}`
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
                  <Typography
                    variant="h4"
                    style={{ margin: '20px 10px 20px 0px' }}
                  >
                    Total: ${' '}
                    {Number(formatDisplayNumber(totalPrice)).toFixed(4)}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      }
    />
  );
};
export default CardOrderDetailsComponent;
