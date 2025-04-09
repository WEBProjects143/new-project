const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Registeration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check existing user
        if (await User.findOne({ email })) {
            return res.status(400).json({ msg: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ user: { id: user.id } },process.env.JWT_SECRET,{ expiresIn: '5h' });

        res.status(200).json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'something went wrong' });
    }
};
//User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: 'Invalid Email or password' });
        }

        const payload = {user: {id: user.id}};

        jwt.sign( payload,process.env.JWT_SECRET,{ expiresIn: '5h' },(err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};
//get all users detail
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};