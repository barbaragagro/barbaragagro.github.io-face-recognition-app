const handleRegister = (req, res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if (!email || !name || !password) {
		return res.status(400).json("Incorrect form submission");
	}
	/*bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    }); 
}); */


var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into ('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users').returning('*').insert ({
				email: loginEmail[0].email,
				name: name,
				joined: new Date()
				}).then(user=> {
				res.json(user[0]); 
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		
	.catch(err => res.status(400).json('unable to register'))
}

export {handleRegister};