import { Min } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class Paginated {
  @Field(type => Int, { nullable: true })
  @Min(1)
  page?: number;

  @Field(type => Int, { nullable: true })
  @Min(1)
  limit?: number;
}