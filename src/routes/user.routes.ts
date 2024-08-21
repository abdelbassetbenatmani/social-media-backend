import express from 'express';
const userRoute = express.Router()


import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controller/user.controller';

userRoute.get('/', getUsers);
userRoute.get('/:id', getUser);
userRoute.post('/', createUser);
userRoute.put('/:id', updateUser);
userRoute.delete('/:id', deleteUser);

export default userRoute;