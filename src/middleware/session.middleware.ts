import session from 'express-session';
const sess = {
    secret: '42',
    cookie: {secure: false},
    resave: false,
    saveUnitialized: false
};

export const sessionMiddleware = session(sess);