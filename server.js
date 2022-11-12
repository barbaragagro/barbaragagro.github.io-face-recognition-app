import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import {handleRegister} from './controlers/register.js';
import {handleSignIn} from './controlers/signin.js';
import {handleProfile} from './controlers/profile.js';
import {handlerImage} from './controlers/image.js';
import {handleApiCall} from './controlers/image.js';

const db = knex ({
  	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    //port : 3000,
    user : 'postgres',
    password : '2254',
    database : 'face-recognition-app-database'
  }
});

//db.select('*').from('users').then ( data => { console.log(data); });



const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
	res.send('success');
})


app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt);});

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db);});
	
app.put('/image', (req, res) => {handlerImage(req, res, db);});

app.post('/imageurl', (req, res) => {handleApiCall(req, res);});






app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})