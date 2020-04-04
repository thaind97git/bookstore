import Head from 'next/head';
import React from 'react';
import PageLayout from '../../../layouts/PageLayout';
import SaveModeratorComponent from '../../../components/SaveModeratorComponent';
import AuthenHOC from '../../../components/HOC/AuthenHOC';

const AddNewModeratorPage = () => (
  <PageLayout title="">
    <Head>
      <title key="title">Moderator Add New</title>
    </Head>
    <SaveModeratorComponent />
  </PageLayout>
);
export default AuthenHOC(AddNewModeratorPage);
