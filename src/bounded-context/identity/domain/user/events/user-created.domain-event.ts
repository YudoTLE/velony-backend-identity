import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  name: string;
  username: string;
  avatarPath?: string;
  email?: string;
  phoneNumber?: string;
}

export class UserCreatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserCreated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
