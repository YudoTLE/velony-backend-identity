import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Username } from 'src/modules/user/domain/value-objects/username.vo';

import { UpdateUserUsernameCommand } from '../update-user-username.command';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler implements ICommandHandler<UpdateUserUsernameCommand> {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: UpdateUserUsernameCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updateUsername(Username.create(command.props.username));

    await this.userCommandRepository.save(user);
  }
}
