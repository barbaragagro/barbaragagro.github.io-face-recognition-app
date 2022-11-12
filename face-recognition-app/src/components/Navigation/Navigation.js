import React from 'react';


const Navigation = ({onRouteChangeN, /*isSignedIn,*/ isTryingToRegister, isSignedOut}) => {
	
		if (!isSignedOut){
			return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p onClick={() => onRouteChangeN('signin')} className ='f3 pointer link dim black underline pa3 pointer'>Sign out</p>
		</nav> ); }

		else if (isTryingToRegister) {
			return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p onClick={() => onRouteChangeN('signin')} className ='f3 pointer link dim black underline pa3 pointer'>Sign In</p>
		</nav> ); }

		else  {
			return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p className ='f3 black pa3'>You need to sign in or register!</p>
		</nav> ); }



		
}


export default Navigation;