import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import EditBookComponent from '../../../components/EditBookComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const EditBookPage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Book Edit</title>
    </Head>
    <EditBookComponent />
  </PageLayout>
);
export default AuthenHOC(EditBookPage);
