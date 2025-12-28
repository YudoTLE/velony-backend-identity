import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KafkaModule } from 'src/shared/infrastructure/events/kafka.module';
import { PassportModule } from 'src/shared/infrastructure/passport/passport.module';
import { PgModule } from 'src/shared/infrastructure/persistence/pg/pg.module';

import { RemoveUserPasswordHandler } from './application/commands/handlers/remove-user-password.handler';
import { UpdateUserAvatarPathHandler } from './application/commands/handlers/update-user-avatar-path.handler';
import { UpdateUserNameHandler } from './application/commands/handlers/update-user-name.handler';
import { UpdateUserPasswordHandler } from './application/commands/handlers/update-user-password.handler';
import { UpdateUserUsernameHandler } from './application/commands/handlers/update-user-username.handler';
import { UserCommandRepository } from './domain/repositories/user.command.repository';
import { UserCreatedEventHandler } from './infrastructure/events/user-created.event-handler';
import { UserNameUpdatedEventHandler } from './infrastructure/events/user-name-updated.event-handler';
import { UserController } from './infrastructure/http/user.controller';
import { PgUserCommandRepository } from './infrastructure/repositories/pg-user.command.repository';

@Module({
  imports: [CqrsModule, PgModule, KafkaModule, PassportModule],
  controllers: [UserController],
  providers: [
    RemoveUserPasswordHandler,
    UpdateUserPasswordHandler,
    UpdateUserAvatarPathHandler,
    UpdateUserNameHandler,
    UpdateUserUsernameHandler,

    UserCreatedEventHandler,
    UserNameUpdatedEventHandler,

    {
      provide: UserCommandRepository,
      useClass: PgUserCommandRepository,
    },
  ],
  exports: [UserCommandRepository],
})
export class UserModule {}
