import React from 'react';
import {
  Card,
  CardContent,
  Paper,
  CardActions,
  Typography,
  Button,
  Container
} from '@material-ui/core';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { pick } from 'lodash/fp';

import { connect } from 'react-redux';
import { REMOVE_ITEM, REMOVE_CART } from '../stores/CartState';
import { formatDisplayNumber } from '../utils';
import RLink from '../layouts/RLink';
import Router from 'next/router';

const connectToRedux = connect(pick(['shopingCart']), dispatch => ({
  removeItem: id => dispatch({ type: REMOVE_ITEM, payload: id }),
  removeCard: () => dispatch({ type: REMOVE_CART })
}));

const ShopingCartComponent = ({ shopingCart = [], removeItem, removeCard }) => {
  const totalPrice = shopingCart
    ? shopingCart.reduce((prev, card) => {
        return prev + card.price;
      }, 0)
    : 0;
  return (
    <Container style={{ minHeight: '80vh', marginTop: 30 }}>
      <Card elevation={0}>
        <CardContent style={{ padding: 0 }}>
          <MaterialTable
            isLoading={false}
            components={{
              Container: props => <Paper {...props} elevation={0} />
            }}
            title="Shopping Cart"
            data={shopingCart || []}
            actions={[
              {
                icon: () => <DeleteOutline />,
                tooltip: 'Delete Item(s)',
                onClick: (e, rowData) => {
                  removeItem(rowData.isbn);
                }
              },
              {
                icon: () => <DeleteOutline />,
                tooltip: 'Delete All Item',
                onClick: () => {
                  removeCard();
                },
                isFreeAction: true
              }
            ]}
            columns={[
              { title: 'Quantity', field: 'quantity', type: 'numeric' },
              { title: 'Book', field: 'title' },
              { title: 'Price', field: 'price', type: 'currency' }
            ]}
            options={{
              actionsColumnIndex: -1,
              emptyRowsWhenPaging: false,
              paging: false,
              search: false
            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'No item in your shopping cart'
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
          <Button
            disabled={shopingCart.length ? false : true}
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
            onClick={() => Router.push('/order')}
          >
            Checkout now
          </Button>
          <RLink href="/">
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Buy More
            </Button>
          </RLink>
        </CardActions>
      </Card>
    </Container>
  );
};

export default connectToRedux(ShopingCartComponent);
