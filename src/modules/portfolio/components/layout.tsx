import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  title: string | undefined;
  description: string | undefined;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Демо-платформа для трейдингу криптовалют',
  description = 'вибирай криптовалюти, додавай танзакції, платворма вирахує прибуток в порівнянні з поточним курсом',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
