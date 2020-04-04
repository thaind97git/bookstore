import Head from 'next/head';
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import ProfileComponent from '../../components/ProfileComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';
const ProfilePage = () => (
  <PageLayout title="Profile">
    <Head>
      <title key="title">Profile</title>
    </Head>
    <ProfileComponent />
  </PageLayout>
);
export default AuthenHOC(ProfilePage);
