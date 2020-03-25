import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BookManagementComponent from '../../components/BookManagementComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Book Management</title>
    </Head>
    <BookManagementComponent />
  </PageLayout>
);
export default AuthenHOC(HomePage);
