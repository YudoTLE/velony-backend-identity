import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Password } from 'src/modules/user/domain/value-objects/password.vo';

import { RemoveUserPasswordCommand } from '../remove-user-password.command';

@CommandHandler(RemoveUserPasswordCommand)
export class RemoveUserPasswordHandler implements ICommandHandler<RemoveUserPasswordCommand> {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: RemoveUserPasswordCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.removePassword(Password.create(command.props.currentPassword));

    await this.userCommandRepository.save(user);
  }
}
