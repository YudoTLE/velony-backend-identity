import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  name: string;
}

export class UserNameUpdatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserNameUpdated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
