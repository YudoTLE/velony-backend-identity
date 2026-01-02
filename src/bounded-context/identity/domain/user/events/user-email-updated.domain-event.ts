import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  email: string;
}

export class UserEmailUpdatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserEmailUpdated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
