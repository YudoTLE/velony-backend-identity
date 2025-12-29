import { Email } from 'src/modules/user/domain/value-objects/email.vo';
import { type AggregateId } from 'src/shared/domain/base.entity';
import { v7 as uuidv7 } from 'uuid';

import { VerificationEntity } from './base-verification.entity';
import { EmailVerificationIssuedDomainEvent } from '../events/email-verification-issued.domain-event';
import { EmailVerificationRevokedDomainEvent } from '../events/email-verification-revoked.domain-event';
import { EmailVerificationVerifiedDomainEvent } from '../events/email-verification-verified.domain-event';
import { ExpiredVerificationException } from '../exceptions/expired-verification.exception';
import { InvalidVerificationTtlException } from '../exceptions/invalid-verification-ttl.exception';
import { RevokedVerificationException } from '../exceptions/revoked-verification-token.exception';
import { VerifiedVerificationException } from '../exceptions/verified-verification-token.exception';

export class EmailVerificationEntity extends VerificationEntity<Email> {
  private constructor(props: {
    id: AggregateId;
    userId: AggregateId;
    token: string;
    value: Email;
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
    value: Email;
    ttl: number;
  }): EmailVerificationEntity {
    if (props.ttl <= 0) {
      throw new InvalidVerificationTtlException();
    }

    const now = new Date();

    const newVerification = new EmailVerificationEntity({
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
      new EmailVerificationIssuedDomainEvent(newVerification.id, {
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
    value: Email;
    issuedAt: Date;
    expiresAt: Date;
    verifiedAt: Date | null;
    revokedAt: Date | null;
  }): EmailVerificationEntity {
    return new EmailVerificationEntity(props);
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
      new EmailVerificationVerifiedDomainEvent(this._id, {
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
      new EmailVerificationRevokedDomainEvent(this._id, {
        revokedAt: this._revokedAt,
      }),
    );
  }
}
