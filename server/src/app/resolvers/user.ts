import { Arg, Args, Mutation, Query, UseMiddleware } from "type-graphql";
import { RegisterUser } from "./inputs/RegisterUser.input";
import { AuthResponse } from "./types/AuthResponse";
import { getUsersPaginate, registerUser } from "../services/user.service";
import { generateToken, login } from "../services/auth.service";
import { PaginatedUsers } from "./types/PaginatedUser.type";
import { Paginated } from "./types/Paginated.arg";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { LoginUser } from "./inputs/LoginUser.input";
import { FieldError } from "./types/FieldError.type";
import { LoginResponse } from "../dao/LoginResponse.dao";
export class UserResolver {

    @Mutation(()=> AuthResponse)
    async register(
        @Arg("input", { validate: true }) input: RegisterUser,
    ): Promise<AuthResponse> {
        const registerResult:any = await registerUser(input);
        if(registerResult.user !== undefined){
            return {
                token:generateToken(registerResult.user),
                ...registerResult
            };
        }else{
            return {...registerResult};
        }
    }

    @Mutation(()=>AuthResponse)
    async login(
        @Arg('input', { validate: true }) input: LoginUser,
    ):Promise<AuthResponse> {
        return await login(input.email,input.password).then(({token,user}:LoginResponse)=>{
            return {token,user};
        }).catch((errors:FieldError[])=>{
            return {errors};
        });
    }

    
    @UseMiddleware(isAuthenticated)
    @Query(()=>PaginatedUsers)
    async users(
        @Args() {page,limit}:Paginated
    ){
        return await getUsersPaginate(page,limit);
    }
}