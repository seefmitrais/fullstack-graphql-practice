import { User } from "../entities/User";
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { FieldError } from "../resolvers/types/FieldError.type";
import bcrypt from 'bcrypt';
import { LoginResponse } from "../dao/LoginResponse.dao";


export const generateToken = (user:User):string => jwt.sign({ user: user }, process.env.SIGNING_KEY!!, { expiresIn: '1d' });

export const login = async (email:string,password:string):Promise<LoginResponse|FieldError[]> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        email:email
    });

    if(!user){
        return Promise.reject([
            {
                field:'email',
                message:'email does not exist.'
            }
        ]);
    }
    console.log({password,userPassword:user.password});
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if(validPassword){
        return Promise.resolve({
            token:generateToken(user),
            user:user
        }
        );
    }else{
        return Promise.reject([
            {
                field:'password',
                message:'invalid password.'
            }
        ]);
    }
    
}
