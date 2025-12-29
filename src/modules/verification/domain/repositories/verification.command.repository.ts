import { Injectable } from '@nestjs/common';
import { type AggregateId } from 'src/shared/domain/base.entity';

import { VerificationEntity } from '../entities/base-verification.entity';

@Injectable()
export abstract class VerificationCommandRepository {
  public abstract findByUserId(
    userId: AggregateId,
    type: string,
  ): Promise<VerificationEntity | null>;

  public abstract save(entity: VerificationEntity): Promise<void>;
}
