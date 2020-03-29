import React, { useState } from 'react';

import Layout from './Layout';
import GenerateIp from './GenerateIp';
import RandomIp from './RandomIp';
import NetmaskSlider from './NetMaskSlider';
import '../styles/home.scss';

const emptyArray = Array(8).fill('0');

const Home = () => {

  const [randomIp, setRandomIp] = useState('01101001.01110000.00011010.11011001');

  const randomByte = () => Math.round(Math.random()*1);

  const randomByteSequence = () => emptyArray.map(() => randomByte()).join('');

  const handleGenerateIp = () => {
    const ip = randomByteSequence() + '.' +
               randomByteSequence() + '.' +
               randomByteSequence() + '.' +
               randomByteSequence(); 

    setRandomIp(ip);
  } 

  return (
    <Layout>
      <h1 className="instructions">
        Slide the netmask to the right and watch stuff change!
      </h1>
      <GenerateIp onGenerateIp={handleGenerateIp} />
      <RandomIp ipInBinary={randomIp}/>
      <NetmaskSlider ipInBinary={randomIp}/>
    </Layout>
  )
}

export default Home;