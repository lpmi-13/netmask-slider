import React from 'react';
import '../styles/generateButton.scss';
import { motion } from 'framer-motion';

const GenerateIpButton = ({ onGenerateIp }) => {
    return (
      <div className="generateButton">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={onGenerateIp}>Generate new IP</motion.button>
      </div>
    )
}

export default GenerateIpButton;