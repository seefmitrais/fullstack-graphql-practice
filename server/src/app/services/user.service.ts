import { getConnection, getRepository } from "typeorm"
import { User } from "../entities/User"
import { RegisterUser } from "../resolvers/inputs/RegisterUser.input";
import { FieldError } from "../resolvers/types/FieldError.type";

export const registerUser = async (input:RegisterUser):Promise<{user:User}|{errors:FieldError[]}> => {
    let errors:FieldError[]=[];
    if(await isUsernameUsed(input.username)){
        errors.push({
            field:'username',
            message:'username already taken.'
        });
    }
    if(await isEmailUsed(input.email)){
        errors.push({
            field:'email',
            message:'email already taken.'
        });
    }
    if(errors.length > 0){
        return {errors};
    }
    let userRepository = getRepository(User);
    const newUser = userRepository.create({
        email:input.email,
        username:input.username,
        password:input.password
    });
    const user = await userRepository.save(newUser)
    return {user};
};

export const getUsersPaginate = async (page:number,limit:number):Promise<{users:User[],count:number}> => {
    const skip = Math.max(0,page-1)*limit;
    console.log(skip);
    const [users,count] = await getRepository(User)
        .createQueryBuilder('user')
        .skip(skip)
        .take(limit)
        .getManyAndCount();
    return {users,count};
}

export const isUsernameUsed = async (username:string):Promise<Boolean> => {
    let userRepository = getRepository(User);
    const [_, total] = await userRepository.findAndCount({
        username:username
    });
    return total > 0;
};

export const isEmailUsed = async (email:string):Promise<Boolean> => {
    let userRepository = getRepository(User);
    const [_, total] = await userRepository.findAndCount({
        email:email
    });
    return total > 0;
};
