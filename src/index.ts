import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimbursementRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import * as userdao from './dao/user.dao';

const app = express();

app.use((req, res, next) => {
  console.log(`request made with url: ${req.url} and method: ${req.method}`);
  // const headers = req.rawHeaders;
  // console.log(headers);
  next();
});

// attach an actual object to req.body
app.use(bodyParser.json());

// attach the specific users session data to req.session
app.use(sessionMiddleware);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userdao.findByUsernameAndPassword(username, password);
    if (user) {
      // attach the user data to the session object
      req.session.user = user;
      res.send(req.session.user);
    } else {
      res.sendStatus(401);
    }
  });

/**
 * Register Routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);
// start up the application
app.listen(8081);