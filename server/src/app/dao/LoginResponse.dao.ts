import { User } from "../entities/User";

export type LoginResponse = {
    token:string,
    user:User
}