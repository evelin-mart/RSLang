import React from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export type PageProps = {
  pageClassName: string;
  title: string;
  children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const { pageClassName, title, children } = props;
  const location = useLocation();
  const pageClasses = `${pageClassName} page`;
  const isFooter = pageClassName !== 'game';
  return (
    <>
      <Header />
      <main className={pageClasses}>
        <div className="page__container container">
          <h2 className="page__title">{title}</h2>
          {/* <div className="breadcrumb">
            {location.pathname}
          </div> */}
          <div className='page__content'>
            {children}
          </div>
        </div>
      </main>
      {isFooter && <Footer />}
    </>
  )
}
