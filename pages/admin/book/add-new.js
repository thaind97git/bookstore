import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import SaveBookComponent from '../../../components/SaveBookComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const AddNewBookPage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Book Add New</title>
    </Head>
    <SaveBookComponent />
  </PageLayout>
);
export default AuthenHOC(AddNewBookPage);
