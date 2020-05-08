import React from 'react';

export default () => (
  <div className="content post-not-found">
    <h1 className="content--title">
      <span className="content--title-inner">404: Page Not Found</span>
    </h1>

    <div className="content--body tc">
      <h2>Sorry, this page could not be found.</h2>
      <p>The page you are looking for doesn't exist, no longer exists or has been moved.</p>
    </div>

    <div
      className="dn"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
    />
  </div>
);