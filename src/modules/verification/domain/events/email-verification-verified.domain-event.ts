import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class EmailVerificationVerifiedDomainEvent extends DomainEvent {
  public static readonly TYPE = 'EmailVerificationVerified';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      verifiedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
