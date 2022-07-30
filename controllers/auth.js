const express = require('express');

const User = require('../models/user');

const signup = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    try {
        await user.save((err, user) => {
            if(err) {
                console.log(err.message);
            } else {
                res.render('secret', {user: user});
            }
        });
    } catch(err) {
        console.log(err);
        res.redirect('/auth/signup');
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username, 
            password: req.body.password
        });
        if(user === null) {
            res.render('home', {err: 'No user found!', btn: 'Login'});
        } else {
            res.render('secret', {user: user});
        }
    } catch(err) {
        console.log(err);
    }
};

module.exports = { signup, login };