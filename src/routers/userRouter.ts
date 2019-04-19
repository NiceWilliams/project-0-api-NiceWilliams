import express from 'express';
import { User } from '../model/user';
import { users } from '../states';
import { findUsers } from '../dao/user.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import * as userDao from '../dao/user.dao';
/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();


/**
 * find all users
 * endpoint: /users
 */
userRouter.get('', [authMiddleware(['Admin', 'Finance Manager']), async (req, res) => {
  const users = await findUsers();
    console.log('retreiving all users');
    console.log(users);
    res.json(users);
  }]);


/**
 * find user by id
 * endpoint: /users/:id
 */
userRouter.get('/:id', [(req, res, next) => {
   const endpoint = req.session.user;
    if (endpoint.userId === +req.params.id) {
      next();
    } else if (endpoint.role.role === 'Admin' || endpoint.role.role === 'Finance Manager') {
      next();
    } else {
      res.status(401).send ('The incoming token has expired');
    }
}, async (req, res) => {
  const id: number = +req.params.id;
  console.log(`retreiving user with id: ${id}`);
  const user = await userDao.findUsersById(id);
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
}]);


userRouter.post('', (req, res) => {
  console.log(`creating user`, req.body);
  const user: User = req.body;
  user.userId = Math.floor(Math.random() * 10000000);
  users.push(user);
  res.status(201);
  res.send(user);
});

userRouter.patch('', async (req, res) => {
  const user = req.body;
  let inUser = await userDao.findUsersById(req.body.userId);
  if ((inUser.username !== user.username) && user.username !== undefined) {
    inUser.username = user.username;
  }
  if ((inUser.user_password !== user.user_password) && user.user_password !== undefined) {
    inUser.user_password = user.user_password;
  }
  if ((inUser.first_name !== user.first_name) && user.first_name !== undefined) {
    inUser.first_name = inUser.first_name;
  }
  if ((inUser.last_name !== user.last_name) && user.last_name !== undefined) {
    inUser.last_name = user.last_name;
  }
  if ((inUser.email !== user.email) && user.email !== undefined) {
    inUser.email = user.email;
  }
  if ((inUser.user_role !== user.user_role) && user.user_role !== undefined) {
    inUser.user_role = user.user_role;
  }
  await userDao.updateUsers(user.userid, inUser.username, inUser.user_password, inUser.first_name, inUser.last_name, inUser.email, inUser.user_role);
  inUser = await userDao.findUsersById(req.body.userId);
  res.json(inUser);
  }
);