import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class UserPasswordUpdatedDomainEvent extends DomainEvent {
  constructor(userId: AggregateId) {
    super(userId);
  }
}
