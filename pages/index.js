import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import HomeComponent from '../components/HomeComponent';

const HomePage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Book Store</title>
    </Head>
    <HomeComponent />
  </ClientPageLayout>
);
export default HomePage;
