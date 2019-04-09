import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import { users } from './states';

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      // attach the user data to the session object
      req.session.user = user;
      res.end();
    } else {
      res.sendStatus(401);
    }
  })
  
/**
 * Register Routers
 */
app.use('/users', userRouter);

// start up the application
app.listen(8080, () => {
  console.log(`application started`);
});