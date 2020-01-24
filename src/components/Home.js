import React from 'react';

import Layout from './Layout';
import NetmaskSlider from './NetMaskSlider';
import '../styles/home.scss';

const Home = () => {

  return (
    <Layout>
      <span className="instructions">
        Slide the netmask to the right and watch stuff change!
      </span>
      <NetmaskSlider/>
    </Layout>
  )
}

export default Home;