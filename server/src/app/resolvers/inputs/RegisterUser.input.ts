import { IsEmail, Length, Min, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUser {
  @Field()
  @IsEmail()
  @Length(4,255)
  email!: string;

  @Field()
  @Length(4,255)
  username!: string;

  @Field()
  @Length(8,255)
  password!: string;
}