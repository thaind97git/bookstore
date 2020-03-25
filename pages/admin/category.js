import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import CategoryManagementComponent from '../../components/CategoryManagementComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const CategoryPage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Category Management</title>
    </Head>
    <CategoryManagementComponent />
  </PageLayout>
);
export default AuthenHOC(CategoryPage);
