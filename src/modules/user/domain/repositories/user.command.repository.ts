import { Injectable } from '@nestjs/common';
import { type AggregateId } from 'src/shared/domain/base.entity';

import { UserEntity } from '../entities/user.entity';
import { Username } from '../value-objects/username.vo';

@Injectable()
export abstract class UserCommandRepository {
  public abstract findById(id: AggregateId): Promise<UserEntity | null>;

  public abstract findByUsername(
    username: Username,
  ): Promise<UserEntity | null>;

  public abstract save(entity: UserEntity): Promise<void>;
}
