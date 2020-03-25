import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import OrderComponent from '../components/OrderComponent';

const OrderPage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Order</title>
    </Head>
    <OrderComponent />
  </ClientPageLayout>
);
export default OrderPage;
