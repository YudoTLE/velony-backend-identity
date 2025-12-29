import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class PhoneNumberVerificationRevokedDomainEvent extends DomainEvent {
  public static readonly TYPE = 'PhoneNumberVerificationRevoked';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      revokedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
