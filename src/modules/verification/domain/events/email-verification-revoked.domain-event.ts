import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class EmailVerificationRevokedDomainEvent extends DomainEvent {
  public static readonly TYPE = 'EmailVerificationRevoked';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      revokedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
