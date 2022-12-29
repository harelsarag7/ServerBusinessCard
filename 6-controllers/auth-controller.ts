import express from 'express';
import { addUser, getUsers } from '../5-logic/users-logic';
import * as jwt from 'jsonwebtoken';
import { BadCredentialsError } from '../4-models/BadCredentials';
import { generateToken } from '../2-utils/jwt';

export const authRouter = express.Router();

authRouter.post('/auth/register', async (req, res, next) => {
    const user = req.body;
    await addUser(user);

    // generate token
    const token = generateToken(user);
    res.status(201).send(token);
});

authRouter.post('/auth/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = (await getUsers()).find((user) => user.username === username && user.password === password);

    if (!user) {
        next(new BadCredentialsError());
        return;
    }

    const token = generateToken(user);
    res.status(200).send(token);
})