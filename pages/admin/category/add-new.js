import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import SaveCategoryComponent from '../../../components/SaveCategoryComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const AddNewBookPage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Category Add New</title>
    </Head>
    <SaveCategoryComponent />
  </PageLayout>
);
export default AuthenHOC(AddNewBookPage);
