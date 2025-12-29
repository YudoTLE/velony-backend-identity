import { Command } from 'src/shared/application/base.command';
import { type AggregateId } from 'src/shared/domain/base.entity';

type Props = {
  token: string;
};

type Context = {
  userId: AggregateId;
};

export class VerifyEmailVerificationCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
