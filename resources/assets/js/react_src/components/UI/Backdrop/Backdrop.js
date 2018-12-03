import React from 'react';

const Backdrop = ({show, clicked}) => (
	show ? <div className='Backdrop' onClick={clicked}> </div> : null
);

export default Backdrop;
