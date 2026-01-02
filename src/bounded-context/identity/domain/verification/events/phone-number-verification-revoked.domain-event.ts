import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  revokedAt: Date;
}

export class PhoneNumberVerificationRevokedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'PhoneNumberVerificationRevoked';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
