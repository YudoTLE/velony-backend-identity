import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  revokedAt: Date;
}

export class EmailVerificationRevokedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'EmailVerificationRevoked';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
