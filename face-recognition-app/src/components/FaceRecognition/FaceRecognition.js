import React from 'react';
import './FaceRecognition.css';
import emoji from './emoji.png';

const FaceRecognition = ({imageUrlFR, box}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img alt='' id='inputimage' src={imageUrlFR} width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}><img alt='' src={emoji}/></div>
			</div>
		</div>
		);
}


export default FaceRecognition;