import { PhoneNumber } from 'src/modules/user/domain/value-objects/phone-number.vo';
import { type AggregateId } from 'src/shared/domain/base.entity';
import { v7 as uuidv7 } from 'uuid';

import { VerificationEntity } from './base-verification.entity';
import { PhoneNumberVerificationIssuedDomainEvent } from '../events/phone-number-verification-issued.domain-event';
import { PhoneNumberVerificationRevokedDomainEvent } from '../events/phone-number-verification-revoked.domain-event';
import { PhoneNumberVerificationVerifiedDomainEvent } from '../events/phone-number-verification-verified.domain-event';
import { ExpiredVerificationException } from '../exceptions/expired-verification.exception';
import { InvalidVerificationTtlException } from '../exceptions/invalid-verification-ttl.exception';
import { RevokedVerificationException } from '../exceptions/revoked-verification-token.exception';
import { VerifiedVerificationException } from '../exceptions/verified-verification-token.exception';

export class PhoneNumberVerificationEntity extends VerificationEntity<PhoneNumber> {
  private constructor(props: {
    id: AggregateId;
    userId: AggregateId;
    token: string;
    value: PhoneNumber;
    issuedAt: Date;
    expiresAt: Date;
    verifiedAt: Date | null;
    revokedAt: Date | null;
  }) {
    super(props);
  }

  public static create(props: {
    userId: AggregateId;
    token: string;
    value: PhoneNumber;
    ttl: number;
  }): PhoneNumberVerificationEntity {
    if (props.ttl <= 0) {
      throw new InvalidVerificationTtlException();
    }

    const now = new Date();

    const newVerification = new PhoneNumberVerificationEntity({
      id: uuidv7(),
      userId: props.userId,
      token: props.token,
      value: props.value,
      issuedAt: now,
      expiresAt: new Date(now.getTime() + props.ttl),
      verifiedAt: null,
      revokedAt: null,
    });

    newVerification.addDomainEvent(
      new PhoneNumberVerificationIssuedDomainEvent(newVerification.id, {
        userId: newVerification.userId,
        token: newVerification.token,
        value: newVerification.value.value,
        issuedAt: newVerification.issuedAt,
        expiresAt: newVerification.expiresAt,
      }),
    );

    return newVerification;
  }

  public static reconstitute(props: {
    id: AggregateId;
    userId: AggregateId;
    token: string;
    value: PhoneNumber;
    issuedAt: Date;
    expiresAt: Date;
    verifiedAt: Date | null;
    revokedAt: Date | null;
  }): PhoneNumberVerificationEntity {
    return new PhoneNumberVerificationEntity(props);
  }

  public verify(): void {
    if (this.isRevoked()) {
      throw new RevokedVerificationException();
    }

    if (this.isVerified()) {
      throw new VerifiedVerificationException();
    }

    if (this.isExpired()) {
      throw new ExpiredVerificationException();
    }

    this._verifiedAt = new Date();

    this.addDomainEvent(
      new PhoneNumberVerificationVerifiedDomainEvent(this._id, {
        verifiedAt: this._verifiedAt,
      }),
    );
  }

  public revoke(): void {
    if (this.isRevoked()) {
      throw new RevokedVerificationException();
    }

    if (this.isVerified()) {
      throw new VerifiedVerificationException();
    }

    if (this.isExpired()) {
      throw new ExpiredVerificationException();
    }

    this._revokedAt = new Date();

    this.addDomainEvent(
      new PhoneNumberVerificationRevokedDomainEvent(this._id, {
        revokedAt: this._revokedAt,
      }),
    );
  }
}
