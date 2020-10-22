import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

// this is to create the netmask of 1's up to a certain place
const createOnes = (index) => [...'1'.repeat(index), ...Array(32 - index).fill('0')]

// this is to insert zeroes into the network address after a certain place
const createZeroes = (index) => [...Array(32 - index).fill('0')];

const binaryToDecimal = (binary) => parseInt(binary, 2);

const calculateCidr = index => `/${index}`

const createRange = (range, start, end) => range.slice(start, end).join('');

const StyledTrack = styled.div`
    background: ${props => props.index === 1 ? '#ddd' : '#00DA9F'};
`;

const NetMaskSlider = ({ ipInBinary }) => {
    
    const computeMaskFromSlider = (state) => {

        const [firstOctet, secondOctet, thirdOctet, fourthOctet] = ipInBinary.split('.');

        // this is hacky but will keep for now...ip address in binary without dots
        const ipSequenceInBinary = [...firstOctet.split(''), ...secondOctet.split(''), ...thirdOctet.split(''), ...fourthOctet.split('')];
        
        const withZeroes = ipSequenceInBinary.slice();
        
        withZeroes.splice(state.valueNow, 32 - state.valueNow, ...createZeroes(state.valueNow));

        // now we can set the network address in digital and add the dots between
        const finalNetworkAddress = [
            binaryToDecimal(createRange(withZeroes, 0, 8)),
            '.',
            binaryToDecimal(createRange(withZeroes, 8, 16)),
            '.',
            binaryToDecimal(createRange(withZeroes, 16, 24)),
            '.',
            binaryToDecimal(createRange(withZeroes, 24, 33))
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
            createRange(withDots, 0, 8),
            '.',
            createRange(withDots, 8, 16),
            '.',
            createRange(withDots, 16, 24),
            '.',
            createRange(withDots, 24, 33)
        ];

        const decimalNetMask = [
            binaryToDecimal(createRange(withDots, 0, 8)),
            '.',
            binaryToDecimal(createRange(withDots, 8, 16)),
            '.',
            binaryToDecimal(createRange(withDots, 16, 24)),
            '.',
            binaryToDecimal(createRange(withDots, 24, 33))
        ];
    
        setDecimalNetMask(decimalNetMask.join(''));
        setNetMask(binaryNetMask.join(''));
        setNetworkAddress(finalNetworkAddress.join('') + calculateCidr(state.valueNow));
    
        return;
    }

    const [netMask, setNetMask] = useState('');
    const [decimalNetMask, setDecimalNetMask] = useState('0.0.0.0');
    const [hostNumber, setHostNumber] = useState(0);
    const [addressNumber, setAddressNumber] = useState(0);
    const [networkAddress, setNetworkAddress] = useState(0);

   


const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
 
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
                ariaLabel="netmask slider"
                className="horizontal-slider"
                max={32}
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => <div {...props}>{computeMaskFromSlider(state)}</div>}
                renderTrack={Track}
            />
            </Fragment>
    )
}

export default NetMaskSlider;