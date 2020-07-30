const User = require('../models/userModel');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index') ; 

module.exports.signup = async (req, res, next) => {
    try {
        const { name, username , password } = req.body;

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Please check data');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
 
        const existUsername = await User.findOne({ username : username  });

        if (existUsername) {
            const error = new Error('Username already exits');
            error.statusCode = 400;
            throw error;
        }

        let user = new User();
        user.name = name;
        user.username = username;
        user.password = await user.encryptPassword(password);

        await user.save();

        res.status(201).json({
            data: user,
            success: true
        });
    } catch (err) {
        next(err);
    }
}



exports.signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log (`username: ${username} , password: ${password}`)

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Please check data');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
        
        const user = await User.findOne({ username : username });
        if (!user) {
            const error = new Error('Authentication Failed, User not found');
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 401; 
            throw error;
        }

        //create token
        console.log(user._id);
        const token = await jwt.sign({
            id: user._id,
            name : user.name
        }, config.JWT_SECRET, { expiresIn: '7 days' });

        //decode expiration date
        const expires_in = jwt.decode(token);

        return res.status(200).json({
            success: true,
            token: token,
            expires_in: expires_in.exp,
        });

    } catch (error) {
        next(error);
    }
}

 