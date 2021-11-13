import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  count: number;
}