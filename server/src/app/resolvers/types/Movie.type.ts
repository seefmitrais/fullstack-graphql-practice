import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Movie {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}