import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChangeF, onSubmitF}) => {
	return (
			<div>
				<p className='f3 white'>
					{'This app will detect a face in your picture. Give it a try'}

					</p>
					<p className='whitecolor'>
					{/* <br></br> */}
					{"(Paste the image link in the box below)"}
				</p>
				<div className='center'>
					<div className='form pa4 shadow-5 center'>
						<input type='text' className='f4 pa2 w-70 center' onChange={onInputChangeF}/>
						<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmitF}>
							Detect
						</button>
					</div>
				</div>
			</div>
		);
}


export default ImageLinkForm;