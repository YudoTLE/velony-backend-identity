import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class PhoneNumberVerificationVerifiedDomainEvent extends DomainEvent {
  public static readonly TYPE = 'PhoneNumberVerificationVerified';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      verifiedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
