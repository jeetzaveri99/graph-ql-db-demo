import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookArgs {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;
}
