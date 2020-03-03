import React from 'react';
import '../styles/generateButton.scss';

const GenerateIpButton = ({ onGenerateIp }) => {
    return (
      <div className="generateButton">
        <button onClick={onGenerateIp}>Generate new IP</button>
      </div>
    )
}

export default GenerateIpButton;