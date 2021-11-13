import { User } from "../entities/User";
import jwt from 'jsonwebtoken';

const generateToken = (user:User):string => jwt.sign({ user: user }, process.env.SIGNING_KEY!!, { expiresIn: '1d' });

export {
    generateToken
}