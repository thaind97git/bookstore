import React, { useState, useEffect, Fragment } from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import {
  Button,
  Grid,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DialogComponent from './commons/DialogComponent';
import { formatDisplayNumber, getShortString } from '../utils';
import { UnfoldMore } from '@material-ui/icons';
import {
  getOrders,
  GetOrdersAPI,
  searchOrderByCode,
  SearchOrderByCodeAPI
} from '../stores/OrderState';
import Link from 'next/link';
import OrderStatusComponent from './OrderStatusComponent';

const connectToRedux = connect(
  createStructuredSelector({
    orderData: GetOrdersAPI.dataSelector,
    orderDetailsData: SearchOrderByCodeAPI.dataSelector
  }),
  (dispatch) => ({
    getOrders: ({ pageSize, pageIndex }) =>
      dispatch(getOrders({ pageIndex, pageSize })),
    getOrderByCode: (code) => dispatch(searchOrderByCode(code))
  })
);

const HEADERS = [
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Email',
    key: 'email'
  },
  {
    header: 'Address',
    key: 'address'
  },
  {
    header: 'Phone',
    key: 'phone'
  },
  {
    header: 'Items',
    key: 'items'
  },
  {
    header: 'Note',
    key: 'note'
  },
  {
    header: 'Status',
    key: 'actions'
  }
];
const renderData = ({ data = [], setDialogItems, setItemSelected }) =>
  data.map((item) => {
    return {
      name: item.customerName,
      email: <div>{item.customerEmail}</div>,
      address: (
        <Tooltip title={item.customerAddress}>
          <div>{getShortString(item.customerAddress)}</div>
        </Tooltip>
      ),
      phone: <span>{item.customerPhoneNumber}</span>,
      items: (
        <Tooltip title="View items details">
          <IconButton
            onClick={() => {
              setItemSelected(item.items);
              setDialogItems(true);
            }}
          >
            <UnfoldMore />
          </IconButton>
        </Tooltip>
      ),
      note: (
        <Tooltip title={item.note}>
          <div>{getShortString(item.note)}</div>
        </Tooltip>
      ),
      actions: <OrderStatusComponent status={item.status} />
    };
  });

export const OrderManagementComponent = ({
  orderData,
  getOrders,
  orderDetailsData,
  getOrderByCode
}) => {
  const [isFetch, setIsFetch] = useState(true);
  const [isFetchDetails, setIsFetchDetails] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [dialogItems, setDialogItems] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);

  useEffect(() => {
    if (isFetch) {
      getOrders({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getOrders, pageSize, pageIndex]);

  // useEffect(() => {
  //   if (isFetchDetails) {
  //     getOrderByCode()
  //     setIsFetch(false);
  //   }
  // })
  console.log({ orderDetailsData });

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);

  if (!orderData) {
    return <Grid />;
  }

  const { content = [], totalElements } = orderData;
  return (
    <Fragment>
      <DialogComponent
        size="md"
        isOpenDialog={dialogItems}
        setIsOpenDialog={setDialogItems}
        title="Items details"
        isFooter={false}
        content={
          <List component="nav" aria-label="main mailbox folders">
            {itemSelected.map((item) => (
              <Fragment>
                <ListItem button>
                  <ListItemIcon>
                    <Remove />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div>
                        <span style={{ marginRight: 200 }}>
                          SL: {item.quantity} x{' '}
                          <Link href={`/book-details?isbn=${item.isbn}`}>
                            <a target="_blank">{item.isbn}</a>
                          </Link>
                        </span>{' '}
                        <span>$ {item.priceByOrder}</span>
                      </div>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        }
      />
      <CardSimpleLayout
        header={<div>Order Management</div>}
        body={
          <TablePaginationComponent
            totalCount={totalElements}
            headers={HEADERS}
            onChangePageSize={(pageIndex, pageSize) => {
              setPageSize(pageSize);
              setPageIndex(pageIndex);
            }}
            rows={renderData({
              data: content,
              setDialogItems,
              getOrderByCode,
              setItemSelected
            })}
            striped
          />
        }
      />
    </Fragment>
  );
};
export default connectToRedux(OrderManagementComponent);
