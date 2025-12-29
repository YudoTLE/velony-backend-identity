import { timingSafeEqual } from 'crypto';

import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId, Entity } from 'src/shared/domain/base.entity';
import { ValueObject } from 'src/shared/domain/base.vo';

export abstract class VerificationEntity<
  TValue extends ValueObject<string> = ValueObject<string>,
> extends Entity {
  protected constructor(props: {
    id: AggregateId;
    userId: AggregateId;
    token: string;
    value: TValue;
    issuedAt: Date;
    expiresAt: Date;
    verifiedAt: Date | null;
    revokedAt: Date | null;
  }) {
    super(props.id);
    this._domainEvents = [];
    this._userId = props.userId;
    this._token = props.token;
    this._value = props.value;
    this._issuedAt = props.issuedAt;
    this._expiresAt = props.expiresAt;
    this._verifiedAt = props.verifiedAt;
    this._revokedAt = props.revokedAt;
  }

  protected _domainEvents: DomainEvent[];

  protected _userId: AggregateId;

  protected _token: string;

  protected _value: TValue;

  protected _issuedAt: Date;

  protected _expiresAt: Date;

  protected _verifiedAt: Date | null;

  protected _revokedAt: Date | null;

  public get userId(): AggregateId {
    return this._userId;
  }

  public get token(): string {
    return this._token;
  }

  public get value(): TValue {
    return this._value;
  }

  public get issuedAt(): Date {
    return this._issuedAt;
  }

  public get expiresAt(): Date {
    return this._expiresAt;
  }

  public get verifiedAt(): Date | null {
    return this._verifiedAt;
  }

  public get revokedAt(): Date | null {
    return this._revokedAt;
  }

  public getDomainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public isExpired(): boolean {
    return this._expiresAt < new Date();
  }

  public isVerified(): boolean {
    return this._verifiedAt !== null;
  }

  public isRevoked(): boolean {
    return this._revokedAt !== null;
  }

  public verifyToken(token: string): boolean {
    if (this._token.length !== token.length) return false;
    return timingSafeEqual(Buffer.from(this._token), Buffer.from(token));
  }

  public abstract verify(): void;

  public abstract revoke(): void;
}
