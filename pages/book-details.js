import Head from 'next/head';
import React from 'react';
import ClientPageLayout from '../layouts/ClientPageLayout';
import BookDetailsComponent from '../components/BookDetailsComponent';

const BookDetailsPage = () => (
  <ClientPageLayout>
    <Head>
      <title key="title">Book Details</title>
    </Head>
    <BookDetailsComponent />
  </ClientPageLayout>
);
export default BookDetailsPage;
