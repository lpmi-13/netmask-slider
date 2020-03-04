import React, { useState, Fragment } from 'react';
import ReactSlider from 'react-slider';


const createOnes = (index) => [...'1'.repeat(index), ...Array(32 - index).fill('0')]

const binaryToDecimal = (binary) => parseInt(binary, 2);

const calculateCidr = index => `/${index}`

const firstRange = range => range.slice(0, 8).join('');
const secondRange = range => range.slice(8, 16).join('');
const thirdRange = range => range.slice(16, 24).join('');
const fourthRange = range => range.slice(24, 33).join('');

const NetMaskSlider = () => {

    const computeMaskFromSlider = (state) => {


        console.log(state.valueNow);
        const withDots = createOnes(state.valueNow)
        
        const binaryNetMask = [
            firstRange(withDots),
            '.',
            secondRange(withDots),
            '.',
            thirdRange(withDots),
            '.',
            fourthRange(withDots)
        ]

        const decimalNetMask = [
            binaryToDecimal(firstRange(withDots)),
            '.',
            binaryToDecimal(secondRange(withDots)),
            '.',
            binaryToDecimal(thirdRange(withDots)),
            '.',
            binaryToDecimal(fourthRange(withDots))
        ]
    
        setDecimalNetMask(decimalNetMask.join('') + calculateCidr(state.valueNow));
        setNetMask(binaryNetMask.join(''));
    
        return;
    }

    const [netMask, setNetMask] = useState('');
    const [decimalNetMask, setDecimalNetMask] = useState('0.0.0.0');

    return (
        <Fragment>
        <div className="main-game">
            <div className="netmask">
              {decimalNetMask}
            </div>
            <div className="netmaskInBinary">
                {netMask}
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