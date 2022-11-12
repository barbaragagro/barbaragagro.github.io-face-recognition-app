import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
				{`Hey ${name}, welcome to an app that makes people smile!`} </div>
			<div className='white f3'>
				<br></br>
				{`You pressed the DETECT BUTTON this many times:`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</div>
		);
}


export default Rank;