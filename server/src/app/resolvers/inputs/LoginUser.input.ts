import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginUser{
    @Field()
    @IsEmail()
    email!: string

    @Field()
    password!: string
}