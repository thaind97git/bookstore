import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import UserManagementComponent from '../../../components/UserManagementComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">User Management</title>
    </Head>
    <UserManagementComponent />
  </PageLayout>
);
export default AuthenHOC(HomePage);
