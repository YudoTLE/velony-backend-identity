import { Injectable } from '@nestjs/common';
import { AggregateId } from 'src/shared/domain/base.entity';
import { PgService } from 'src/shared/infrastructure/persistence/pg/pg.service';

import { PgVerificationCommandMapper } from './pg-verification.command.mapper';
import { VerificationEntity } from '../../domain/entities/base-verification.entity';
import { VerificationCommandRepository } from '../../domain/repositories/verification.command.repository';

type VerificationEntityRow = {
  uuid: string;
  user_id: string;
  token: string;
  type: string;
  value: string;
  issued_at: Date;
  expires_at: Date;
  verified_at: Date | null;
  revoked_at: Date | null;
};

@Injectable()
export class PgVerificationCommandRepository implements VerificationCommandRepository {
  public constructor(private readonly pgService: PgService) {}

  public async findByUserId(
    userId: AggregateId,
    type: string,
  ): Promise<VerificationEntity | null> {
    const result = await this.pgService.query<VerificationEntityRow>(
      `
        SELECT
          v.uuid,
          v.user_id,
          v.token,
          v.type,
          v.value,
          v.issued_at,
          v.expires_at,
          v.verified_at,
          v.revoked_at
        FROM verifications v
        WHERE v.user_id = $1
          AND v.type = $2
          AND v.verified_at IS NULL
          AND v.revoked_at IS NULL
        ORDER BY v.issued_at DESC
        LIMIT 1
      `,
      [userId, type],
    );
    if (!result.rows.at(0)) return null;

    return PgVerificationCommandMapper.toEntity(result.rows[0]);
  }

  public async save(entity: VerificationEntity): Promise<void> {
    const data = PgVerificationCommandMapper.toPersistence(entity);

    await this.pgService.query(
      `
        INSERT INTO verifications (
          uuid,
          user_id,
          token,
          type,
          value,
          issued_at,
          expires_at,
          verified_at,
          revoked_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        ON CONFLICT (uuid) DO UPDATE SET
          expires_at = EXCLUDED.expires_at,
          verified_at = EXCLUDED.verified_at,
          revoked_at = EXCLUDED.revoked_at
      `,
      [
        data.uuid,
        data.user_id,
        data.token,
        data.type,
        data.value,
        data.issued_at,
        data.expires_at,
        data.verified_at,
        data.revoked_at,
      ],
    );
  }
}
