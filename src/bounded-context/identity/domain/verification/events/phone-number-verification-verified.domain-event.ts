import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  verifiedAt: Date;
}

export class PhoneNumberVerificationVerifiedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'PhoneNumberVerificationVerified';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
