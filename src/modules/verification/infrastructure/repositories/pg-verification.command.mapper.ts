import { Email } from 'src/modules/user/domain/value-objects/email.vo';
import { PhoneNumber } from 'src/modules/user/domain/value-objects/phone-number.vo';
import { AggregateId } from 'src/shared/domain/base.entity';

import { VerificationEntity } from '../../domain/entities/base-verification.entity';
import { EmailVerificationEntity } from '../../domain/entities/email-verification.entity';
import { PhoneNumberVerificationEntity } from '../../domain/entities/phone-number-verification.entity';
import { UnknownVerificationTypeException } from '../../domain/exceptions/unknown-verification-type.exception';

export class PgVerificationCommandMapper {
  public static toEntity(props: {
    uuid: AggregateId;
    user_id: AggregateId;
    token: string;
    type: string;
    value: string;
    issued_at: Date;
    expires_at: Date;
    verified_at: Date | null;
    revoked_at: Date | null;
  }): VerificationEntity {
    const baseProps = {
      id: props.uuid,
      userId: props.user_id,
      token: props.token,
      issuedAt: props.issued_at,
      expiresAt: props.expires_at,
      verifiedAt: props.verified_at,
      revokedAt: props.revoked_at,
    };

    if (props.type === 'email') {
      return EmailVerificationEntity.reconstitute({
        ...baseProps,
        value: Email.create(props.value),
      });
    }
    if (props.type === 'phone_number') {
      return PhoneNumberVerificationEntity.reconstitute({
        ...baseProps,
        value: PhoneNumber.create(props.value),
      });
    }

    throw new UnknownVerificationTypeException();
  }

  public static toPersistence(entity: VerificationEntity): {
    uuid: string;
    user_id: string;
    token: string;
    type: string;
    value: string;
    issued_at: Date;
    expires_at: Date;
    verified_at: Date | null;
    revoked_at: Date | null;
  } {
    let type: string = 'unknown';
    if (entity instanceof EmailVerificationEntity) {
      type = 'email';
    }
    if (entity instanceof PhoneNumberVerificationEntity) {
      type = 'phone_number';
    }

    if (type === 'unknown') {
      throw new UnknownVerificationTypeException();
    }

    return {
      uuid: entity.id,
      user_id: entity.userId,
      token: entity.token,
      type: type,
      value: entity.value.value,
      issued_at: entity.issuedAt,
      expires_at: entity.expiresAt,
      verified_at: entity.verifiedAt,
      revoked_at: entity.revokedAt,
    };
  }
}
