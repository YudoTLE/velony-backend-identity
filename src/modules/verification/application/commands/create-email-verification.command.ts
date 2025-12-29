import { Command } from 'src/shared/application/base.command';
import { type AggregateId } from 'src/shared/domain/base.entity';

type Props = {
  userId: string;
  email: string;
  ttl: number;
};

type Context = {
  userId: AggregateId;
};

export class CreateEmailVerificationCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
