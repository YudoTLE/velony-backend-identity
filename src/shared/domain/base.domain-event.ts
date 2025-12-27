export declare const DOMAIN_EVENT_BRAND: unique symbol;

import { v4 as uuidv4 } from 'uuid';

import { type AggregateId } from './base.entity';

export type DomainEventId = string;

export abstract class DomainEvent {
  private readonly [DOMAIN_EVENT_BRAND]: DomainEvent;

  public constructor(aggregateId: AggregateId) {
    this.aggregateId = aggregateId;
    this.eventId = uuidv4();
    this.occurredAt = new Date();
  }

  public readonly aggregateId: AggregateId;

  public readonly eventId: DomainEventId;

  public readonly occurredAt: Date;
}
