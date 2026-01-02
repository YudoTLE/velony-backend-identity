import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  username: string;
}

export class UserUsernameUpdatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserUsernameUpdated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
