import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'user_id' })
  user_id: number;

  @Field(() => String, { description: 'full name of user' })
  full_name: String;

  @Field(() => String, { description: 'email of user' })
  email: String;
}
