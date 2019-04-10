export function authMiddleware(roles: string[]) {
    return (req, res, next) => {
    const isAuthorized = roles.includes(req.session.user.role);
    if (isAuthorized) {
        next();
    } else {
        res.sendStatus(403);
    }
    };
}