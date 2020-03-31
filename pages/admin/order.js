import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import OrderManagementComponent from '../../components/OrderManagementComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Order Management</title>
    </Head>
    <OrderManagementComponent />
  </PageLayout>
);
export default AuthenHOC(HomePage);
