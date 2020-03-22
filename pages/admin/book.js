import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
// import UserManagementComponent from '../../components/UserManagementComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Book Management</title>
    </Head>
    Not implement yet
  </PageLayout>
);
export default AuthenHOC(HomePage);
