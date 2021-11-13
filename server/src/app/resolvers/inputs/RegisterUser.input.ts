import { IsEmail, Min, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(4)
  username: string;

  @Field()
  @MinLength(8)
  password: string;
}