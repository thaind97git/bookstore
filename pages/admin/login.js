import Head from 'next/head';
import React from 'react';
import AdminLoginFormComponent from '../../components/AdminLoginFormComponent';
import EmptyPageLayout from '../../layouts/EmptyPageLayout';

const LoginPage = () => (
  <EmptyPageLayout>
    <Head>
      <title key="title">Login Page</title>
    </Head>
    <AdminLoginFormComponent />
  </EmptyPageLayout>
);

export default LoginPage;
