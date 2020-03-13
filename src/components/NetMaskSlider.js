import React, { useState, Fragment } from 'react';
import ReactSlider from 'react-slider';

// this is to create the netmask of 1's up to a certain place
const createOnes = (index) => [...'1'.repeat(index), ...Array(32 - index).fill('0')]

// this is to insert zeroes into the network address after a certain place
const createZeroes = (index) => [...Array(32 - index).fill('0')];

const binaryToDecimal = (binary) => parseInt(binary, 2);

const calculateCidr = index => `/${index}`

const firstRange = range => range.slice(0, 8).join('');
const secondRange = range => range.slice(8, 16).join('');
const thirdRange = range => range.slice(16, 24).join('');
const fourthRange = range => range.slice(24, 33).join('');

const NetMaskSlider = ({ ipInBinary }) => {
    
    const computeMaskFromSlider = (state) => {

        const [firstOctet, secondOctet, thirdOctet, fourthOctet] = ipInBinary.split('.');

        // this is hacky but will keep for now...ip address in binary without dots
        const ipSequenceInBinary = [...firstOctet.split(''), ...secondOctet.split(''), ...thirdOctet.split(''), ...fourthOctet.split('')];
        
        const withZeroes = ipSequenceInBinary.slice();
        
        withZeroes.splice(state.valueNow, 32 - state.valueNow, ...createZeroes(state.valueNow));

        // now we can set the network address in digital and add the dots between
        const finalNetworkAddress = [
            binaryToDecimal(firstRange(withZeroes)),
            '.',
            binaryToDecimal(secondRange(withZeroes)),
            '.',
            binaryToDecimal(thirdRange(withZeroes)),
            '.',
            binaryToDecimal(fourthRange(withZeroes))
        ];

        // set this to 1 if it's 0, since below, anything to the power of 0 is 1
        const numberOfBits = (32 - state.valueNow) || 1;
        const numberOfHosts = Math.pow(2, numberOfBits) - 2 || 1;
        if (state.valueNow === 31) {
            setHostNumber(1);
            setAddressNumber(2)
        } else if (state.valueNow === 32) {
            setHostNumber(1);
            setAddressNumber(1);
        } else {
            setHostNumber(numberOfHosts);
            setAddressNumber(numberOfHosts + 2);
        }
 
        const withDots = createOnes(state.valueNow)
        
        const binaryNetMask = [
            firstRange(withDots),
            '.',
            secondRange(withDots),
            '.',
            thirdRange(withDots),
            '.',
            fourthRange(withDots)
        ];

        const decimalNetMask = [
            binaryToDecimal(firstRange(withDots)),
            '.',
            binaryToDecimal(secondRange(withDots)),
            '.',
            binaryToDecimal(thirdRange(withDots)),
            '.',
            binaryToDecimal(fourthRange(withDots))
        ];
    
        setDecimalNetMask(decimalNetMask.join('') + calculateCidr(state.valueNow));
        setNetMask(binaryNetMask.join(''));
        setNetworkAddress(finalNetworkAddress.join(''));
    
        return;
    }

    const [netMask, setNetMask] = useState('');
    const [decimalNetMask, setDecimalNetMask] = useState('0.0.0.0');
    const [hostNumber, setHostNumber] = useState(0);
    const [addressNumber, setAddressNumber] = useState(0);
    const [networkAddress, setNetworkAddress] = useState(0);

    return (
        <Fragment>
        <div className="main-game">
            <div className="netmask">
              {decimalNetMask}
            </div>
            <div className="netmaskInBinary">
                {netMask}
            </div>
            <div className="hostNumber">
                <div className="network">
                    <span>
                        network address:
                    </span>
                    <span className="networkAddress">
                        {networkAddress}
                    </span>
                </div>
                <div className="addresses">
                    <span>
                        # of addresses:
                    </span>
                    <span className="numberOfAddresses">
                      {addressNumber.toLocaleString()}
                    </span>
                </div>
                <div className="hosts">
                    <span>
                      # of hosts:
                    </span>
                    <span className="numberOfHosts">
                      {hostNumber.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
            <ReactSlider
                className="horizontal-slider"
                max={32}
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => <div {...props}>{computeMaskFromSlider(state)}</div>}
            />
            </Fragment>
    )
}

export default NetMaskSlider;