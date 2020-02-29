import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import ShopingCardComponent from '../components/ShopingCardComponent';

const HomePage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Card</title>
    </Head>
    <ShopingCardComponent />
  </ClientPageLayout>
);
export default HomePage;
