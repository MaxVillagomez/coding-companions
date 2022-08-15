const express = require('express');
const apiRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {createUser, getUserByEmail} = require('../db');
const { JWT_SECRET = 'hiddenSecret'} = process.env;

apiRouter.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const _user = await getUserByEmail(email);
        if(_user) {
            res.status(401)
            .send({
                error: '401',
                message: `Email ${email} is aleady taken.`,
                name: 'EmailExistsError'
            });
        }
        const user = await createUser({email, password});
        const token = jwt.sign({id: user.id, email}, process.env.JWT_SECRET);
        res.send({
            message: 'Thank you for signing up!',
            token
        });
    } catch (error) {
        console.error("Touble registering user.")
        throw error;
    }
})


apiRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.send({
            name: 'MissingCredentialsError',
            message: 'Please supply both a email and password'
        });
    }
    try {
        const user = await getUserByEmail(email);
        if (user && user.password === password) {
            const token = jwt.sign({ id: user.id, email}, JWT_SECRET);
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
              });
        }
    } catch (error) {
        console.error('Trouble logging in.')
        throw error;
    }
})





















module.exports = apiRouter