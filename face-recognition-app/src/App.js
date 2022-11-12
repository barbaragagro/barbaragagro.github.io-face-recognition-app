
import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ParticlesBg from 'particles-bg';
//import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import axios from 'axios';



const initialState ={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedOut: true,
      isTryingToRegister: false,
      user: {
        email: '',
        name: '',
        id: '',
        entries: '',
        joined: ''
      }}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
    }
  

/*  componentDidMount() {
    console.log('hi');
    fetch ("http://localhost:3001/")
      .then(response=> response.json())
      .then(console.log);
  }  */

  loadUser =(data)=> {
    this.setState({user: {
        email: data.email,
        name: data.name,
        id: data.id,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

   displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {

    this.setState({imageUrl: this.state.input});
    fetch ("http://localhost:3001/imageurl", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
        .then(response=> response.json())
    
        .then(response => {
          if (response) {
            fetch ("http://localhost:3001/image", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
            
      .then(response=> response.json())
      .then(count =>{
          this.setState(Object.assign(this.state.user, {entries: count}))
          })
        .catch(console.log)
      }
          
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
    .catch(err => console.log(err));
      
  }

  onRouteChange = (route) => {
    //console.log('changed');
    

    if (route==='home') {
      this.setState({isSignedOut: false});
      //console.log('home');
    }
  
      else 
      {

                if (route==='register') {
                  this.setState(initialState);
              this.setState({isTryingToRegister: true});
              //console.log('register');
            }
              else 
              {
              //  this.setState({isTryingToRegister: false});
                //console.log('not register');
                this.setState(initialState);
              }
      }
  this.setState({route: route});
    }

  render() {
    const { isSignedOut, isTryingToRegister, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg type='circle' bg={true} />
        <Navigation onRouteChangeN={this.onRouteChange} isSignedOut={isSignedOut} isTryingToRegister={isTryingToRegister} />

        <Logo />

        {route==='signin'

        ? <SignIn loadUser={this.loadUser} onRouteChangeS={this.onRouteChange} />  
        
        : (route==='home' 
        ?  <div>
              <Rank name={this.state.user.name} entries= {this.state.user.entries} />
              <ImageLinkForm onInputChangeF={this.onInputChange} onSubmitF = {this.onSubmit}/>
              <FaceRecognition box={box} imageUrlFR={imageUrl}/>
            </div>
        : <Register loadUser={this.loadUser} onRouteChangeR={this.onRouteChange} /> )} 
        
      </div>
    );
  }
}

export default App;
