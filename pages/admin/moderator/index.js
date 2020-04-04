import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import ModeratorManagementComponent from '../../../components/ModeratorManagementComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const HomePage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Moderator Management</title>
    </Head>
    <ModeratorManagementComponent />
  </PageLayout>
);
export default AuthenHOC(HomePage);
