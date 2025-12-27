import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class UserUsernameUpdatedDomainEvent extends DomainEvent {
  constructor(
    userId: AggregateId,
    public readonly props: {
      username: string;
    },
  ) {
    super(userId);
  }
}
