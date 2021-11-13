import { Response,Request } from "express";
import { User } from "../entities/User";

export type AppContext = {
    res: Response & {user:User},
    req: Request
}