import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import OrderDetailsComponent from '../components/OrderDetailsComponent';

const HomePage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Order details</title>
    </Head>
    <OrderDetailsComponent />
  </ClientPageLayout>
);
export default HomePage;
