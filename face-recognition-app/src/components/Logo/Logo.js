import React from 'react';
import Tilt from 'react-parallax-tilt';
import facerecognition from './facerecognition.png';
import './Logo.css';


const Logo = () => {
	return (
			<div className='ma4 mt0'>
				<Tilt>
					<div className='Tilt center br2 shadow-2' style={{ height: '150px', width: '150px', background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)'}}>
        				<h1 className='Tilt-inner pa3'><img style={{ paddingBottom: '5px'}} alt='logo' src={facerecognition}/></h1>
      				</div>
				</Tilt>
			</div>
		);
}


export default Logo;