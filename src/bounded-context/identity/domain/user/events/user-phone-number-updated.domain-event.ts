import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  phoneNumber: string;
}

export class UserPhoneNumberUpdatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserPhoneNumberUpdated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
