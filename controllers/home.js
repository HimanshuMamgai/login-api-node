const express = require('express');

const getHomePage = async (req, res) => {
    res.locals.btn = "";
    res.render('home');
};

const getForm = async (req, res) => {
    const inputType = req.body.homeBtn;
    console.log(inputType);
    if(inputType == "Login") {
        res.locals.btn = inputType
        res.render('home', {});
    } else {
        res.locals.btn = inputType
        res.render('home', {});
    }
};

module.exports = { getHomePage, getForm };