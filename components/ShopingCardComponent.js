import React, { useState, useEffect } from 'react';
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
import { REMOVE_ITEM, REMOVE_CARD } from '../stores/CardState';
import { formatDisplayNumber } from '../utils';
import RLink from '../layouts/RLink';

const connectToRedux = connect(pick(['shopingCard']), dispatch => ({
  removeItem: id => dispatch({ type: REMOVE_ITEM, payload: id }),
  removeCard: () => dispatch({ type: REMOVE_CARD })
}));

const ShopingCardComponent = ({ shopingCard = [], removeItem, removeCard }) => {
  const totalPrice = shopingCard
    ? shopingCard.reduce((prev, card) => {
        return prev + card.price;
      }, 0)
    : 0;
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentButton, setShowPaymentButton] = useState(true);

  useEffect(() => {
    !!shopingCard.length && setIsLoading(false);
  }, [shopingCard]);
  return (
    <Container style={{ minHeight: '80vh', marginTop: 30 }}>
      <Card elevation={0}>
        <CardContent style={{ padding: 0 }}>
          <MaterialTable
            components={{
              Container: props => <Paper {...props} elevation={0} />
            }}
            isLoading={isLoading}
            title="Shopping Cart"
            data={shopingCard || []}
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
              { title: 'Book', field: 'title' },
              { title: 'Quantity', field: 'quantity', type: 'numeric' },
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

          {/* <div
            style={{ padding: '10px 20px 10px 10px', textAlign: 'right' }}
          ></div> */}
        </CardContent>
        {showPaymentButton && (
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Typography variant="h4" style={{ margin: '20px 10px 20px 0px' }}>
              Total: $ {Number(formatDisplayNumber(totalPrice)).toFixed(4)}
            </Typography>
            <RLink href="/order">
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                Payment
              </Button>
            </RLink>
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
        )}
      </Card>
    </Container>
  );
};

export default connectToRedux(ShopingCardComponent);
