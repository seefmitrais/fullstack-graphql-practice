import { Field, ObjectType } from "type-graphql";
import { Movie } from "./Movie.type";

@ObjectType()
export class Movies {
  @Field(() => [Movie])
  movies: Movie[];
}