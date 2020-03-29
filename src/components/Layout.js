import React from 'react';
import '../styles/layout.scss';

const Layout = ({ children }) => {
  return (
    <main>
      <div className="container">
        {children}
      </div>
    </main>
  )
}

export default Layout;