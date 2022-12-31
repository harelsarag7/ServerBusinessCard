import express from 'express';
// import { addUser, getUser, getUsers } from '../5-logic/users-logic';
import { addUser, getUser, getUsers } from '../5-logic/users-logic';
import { BadCredentialsError } from '../4-models/BadCredentials';
import { generateToken } from '../2-utils/jwt';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserModel } from '../4-models/UserModel';

export const authRouter = express.Router();

authRouter.post('/auth/register', async (req, res, next) => {
    const {firstName, lastName, email, phone, username, password} = req.body;
    const result = await addUser(firstName, lastName, email, phone, username, password);
    let id = result.id
    const user: UserModel = {id, firstName, lastName, email, phone, username, password}
    const token = generateToken(user);
    res.status(201).send(token);
});

authRouter.get('/user/:id([0-9]+)', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUser(+id);
        res.json(user);
    } catch (e) {
        next(new ResourceNotFoundError());
    }
})


authRouter.post('/auth/login', async (req, res, next) => {
    
    const { username, password } = req.body;
    username.toString();
    password.toString();
    const user = (await getUsers()).find((user) => user.username === username && user.password === password);
    
    if (!user) {
        next(new BadCredentialsError());
        res.status(404)
        return;
    }

    const token = generateToken(user);
    res.status(200).json(token);
})


