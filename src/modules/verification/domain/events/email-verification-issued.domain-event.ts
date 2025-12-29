import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class EmailVerificationIssuedDomainEvent extends DomainEvent {
  public static readonly TYPE = 'EmailVerificationIssued';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      userId: AggregateId;
      token: string;
      value: string;
      issuedAt: Date;
      expiresAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
