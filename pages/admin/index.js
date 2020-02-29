import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import DashboardComponent from '../../components/DashboardComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Club21 Compound</title>
    </Head>
    <DashboardComponent />
  </PageLayout>
);
export default AuthenHOC(HomePage);
