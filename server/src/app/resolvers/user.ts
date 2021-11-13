import { Arg, Args, Mutation, Query, UseMiddleware } from "type-graphql";
import { RegisterUser } from "./inputs/RegisterUser.input";
import { RegisterResponse } from "./types/RegisterResponse.type";
import { getUsersPaginate, registerUser } from "../services/user.service";
import { generateToken } from "../services/auth.service";
import { PaginatedUsers } from "./types/PaginatedUser.type";
import { Paginated } from "./types/Paginated.arg";
import { isAuthenticated } from "../middlewares/auth.middleware";
export class UserResolver {

    @Mutation(()=> RegisterResponse)
    async register(
        @Arg("input") input: RegisterUser,
    ): Promise<RegisterResponse> {
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

    
    @UseMiddleware(isAuthenticated)
    @Query(()=>PaginatedUsers)
    async users(
        @Args() {page,limit}:Paginated
    ){
        return await getUsersPaginate(page,limit);
    }
}