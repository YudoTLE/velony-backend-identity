import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

interface Payload {
  userId: AggregateId;
  token: string;
  value: string;
  issuedAt: Date;
  expiresAt: Date;
}

export class PhoneNumberVerificationIssuedDomainEvent extends DomainEvent<Payload> {
  public static readonly Type = 'PhoneNumberVerificationIssued';

  constructor(aggregateId: AggregateId, payload: Payload) {
    super(aggregateId, payload);
  }
}
