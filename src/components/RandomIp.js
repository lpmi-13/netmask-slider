import React, { Fragment } from 'react';


const RandomIps = ({ ipInBinary }) => {

    const [firstRange, secondRange, thirdRange, fourthRange] = ipInBinary.split('.');

    return (
        <Fragment>
            <div className="ipAddress">
                {parseInt(firstRange, 2) + '.' + parseInt(secondRange, 2) + '.' + parseInt(thirdRange, 2) + '.' + parseInt(fourthRange, 2)}
            </div>
            <div className="ipAddressInBinary">
                {ipInBinary}
            </div>
        </Fragment>
    )
}

export default RandomIps;