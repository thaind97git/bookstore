import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import ShopingCartComponent from '../components/ShopingCartComponent';

const HomePage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Card</title>
    </Head>
    <ShopingCartComponent />
  </ClientPageLayout>
);
export default HomePage;
