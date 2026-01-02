import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  avatarPath: string;
}

export class UserAvatarPathUpdatedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'UserAvatarPathUpdated';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
