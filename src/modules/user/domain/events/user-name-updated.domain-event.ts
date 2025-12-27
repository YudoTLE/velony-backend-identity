import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class UserNameUpdatedDomainEvent extends DomainEvent {
  constructor(
    userId: AggregateId,
    public readonly props: {
      name: string;
    },
  ) {
    super(userId);
  }
}
