import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class UserPasswordRemovedDomainEvent extends DomainEvent {
  constructor(userId: AggregateId) {
    super(userId);
  }
}
