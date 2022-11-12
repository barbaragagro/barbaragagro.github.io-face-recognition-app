const handleSignIn = (req, res, db, bcrypt)=>{
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json("Incorrect form submission");
	}

	/* // Load hash from your password DB.
bcrypt.compare("cookies", hash, function(err, res) {
    // res === true
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
});
 
// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("cookies", hash).then((res) => {
    // res === true
});
*/

	db.select('email', 'hash').from('login')
		.where('email','=',req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(password,data[0].hash); // true
			if (isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
};


export {handleSignIn};