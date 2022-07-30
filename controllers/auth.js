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
        const foundUsername = await User.findOne({username: user.username});
        if(foundUsername != null) {
            await user.save((err, user) => {
                if(err) {
                    console.log(err.message);
                } else {
                    res.status(201).json(user);
                }
            });
        } else {
            res.status(406).json({message: 'Username already exist!'});
        }
    } catch(err) {
        res.status(500).json({err: err.message});
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username, 
            password: req.body.password
        });
        if(user === null) {
            res.status(404).json({message: 'No user found!'});
        } else {
            res.status(200).json(user);
        }
    } catch(err) {
        res.status(500).json({err: err.message});
    }
};

module.exports = { signup, login };