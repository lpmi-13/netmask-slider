import React from 'react';
import Slider from 'rc-slider';

const NetMaskSlider = () => {
    return (
        <div className="main-game">
            <div className="ipAddress">
                192.168.0.45
            </div>
            <div className="ipAddressInBinary">
                11000000.10101000.00000000.00101101
            </div>
            <div className="netmask">
                255.255.255.255
            </div>
            <div className="netmaskInBinary">
                11111111.11111111.11111111.11111111
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
            />
        </div>
    )
}

export default NetMaskSlider;