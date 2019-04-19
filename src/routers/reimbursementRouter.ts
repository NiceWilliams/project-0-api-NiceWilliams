import * as userDao from '../dao/user.dao';
import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';

export const reimbursementRouter = express.Router();


reimbursementRouter.get('/reimbursements/author/userid/:usersid', [(req, res, next) => {
    const endpoint = req.session.user;
     if (endpoint.userId === +req.params.usersid) {
       next();
     } else if (endpoint.role.role === 'Admin' || endpoint.role.role === 'Finance Manager') {
       next();
     } else {
       res.status(401).send ('');
     }
  }, async (req, res) => {
   const id: number = +req.params.usersid;
   console.log(`retreiving user with id: ${id}`);
   const user = await userDao.findReimbursementByAuthor(id);
   if (user) {
     res.send(user);
   } else {
     res.sendStatus(404);
   }
  }]);


reimbursementRouter.patch('', async (req, res) => {
    const user = req.body;
    let inUser = await userDao.findReimbursementById(req.body.reimbursementId);
    if ((inUser.reimbursementId !== user.reimbursementId) && user.reimbursementId !== undefined) {
      inUser.reimbursementId = user.reimbursementId;
    }
    if ((inUser.author !== user.author) && user.author !== undefined) {
      inUser.author = user.author;
    }
    if ((inUser.amount !== user.amount) && user.amount !== undefined) {
      inUser.amount = inUser.amount;
    }
    if ((inUser.dateSubmitted !== user.dateSubmitted) && user.dateSubmitted !== undefined) {
      inUser.dateSubmitted = user.dateSubmitted;
    }
    if ((inUser.dateResolved !== user.dateResolved) && user.dateResolved !== undefined) {
      inUser.dateResolved = user.dateResolved;
    }
    if ((inUser.description !== user.description) && user.description !== undefined) {
      inUser.description = user.description;
    }
    if ((inUser.resolver !== user.resolver) && user.resolver !== undefined) {
        inUser.resolver = user.resolver;
    }
    if ((inUser.status !== user.status) && user.status !== undefined) {
        inUser.status = user.status;
    }
    if ((inUser.type !== user.type) && user.type !== undefined) {
        inUser.type = user.type;
    }
    await userDao.updateReimbursement(user.reimbursementId, inUser.author, inUser.amount, inUser.dateSubmitted,
        inUser.dateResolved, inUser.description, inUser.resolver, inUser.status, inUser.type);
    inUser = await userDao.findReimbursementById(req.body.reimbursementId);
    res.json(inUser);
    }
  );

  reimbursementRouter.get('/status/:statusId', [authMiddleware(['Admin', 'Finance Manager']),
   async (req, res) => {
   const id: number = +req.params.statusId;
   const user = await userDao.findReimbursementByStatus(id);
   if (user) {
     res.send(user);
   } else {
     res.sendStatus(404);
   }
  }]);

  reimbursementRouter.post('/reimbursements',
   async (req, res) => {
   const user = await userDao.createReimbursement(req.body.author, req.body.amount, req.body.datesubmitted, req.body.dateresolved,
    req.body.description, req.body.resolver, req.body.status, req.body.type);
   if (user) {
     res.send(user);
   } else {
     res.sendStatus(404);
   }
  });