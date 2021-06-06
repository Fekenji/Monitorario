import React from 'react';
import { useRa } from '../../MainContext';

const Ra = () => {
    return (<div id="ra">{useRa()}</div>)
}
export default Ra;