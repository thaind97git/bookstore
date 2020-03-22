import React from 'react';
import Head from 'next/head';
import PageLayout from '../../layouts/PageLayout';
import SettingComponent from '../../components/SettingComponent';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const SettingsPage = () => (
  <PageLayout title="Settings">
    <Head>
      <title key="title">Settings</title>
    </Head>
    <SettingComponent />
  </PageLayout>
);

export default AuthenHOC(SettingsPage);
