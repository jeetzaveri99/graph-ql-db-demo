import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegistrationArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
