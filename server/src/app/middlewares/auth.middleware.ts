import { MiddlewareFn, UnauthorizedError } from "type-graphql";
import { AppContext } from "../context/AppContext";
import jwt from 'jsonwebtoken'
import { User } from "../entities/User";
export const isAuthenticated:MiddlewareFn<AppContext> = ({context},next) => {
    try {
        const authHeader = context.req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        var decoded:any = jwt.verify(token, process.env.SIGNING_KEY );
        context.res.user = <User>decoded.user;
        return next();
    } catch (error) {
        throw new UnauthorizedError();
    }
    
}
