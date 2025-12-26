import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { StoragePath } from 'src/shared/domain/value-objects/storage-path.vo';

import { UpdateUserAvatarPathCommand } from '../update-user-avatar-path.command';

@CommandHandler(UpdateUserAvatarPathCommand)
export class UpdateUserAvatarPathHandler implements ICommandHandler<UpdateUserAvatarPathCommand> {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: UpdateUserAvatarPathCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updateAvatarPath(StoragePath.create(command.props.avatarPath));

    await this.userCommandRepository.save(user);
  }
}
