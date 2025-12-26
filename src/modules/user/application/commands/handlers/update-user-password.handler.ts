import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Password } from 'src/modules/user/domain/value-objects/password.vo';

import { UpdateUserPasswordCommand } from '../update-user-password.command';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: UpdateUserPasswordCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updatePassword(
      Password.create(command.props.currentPassword),
      Password.create(command.props.password),
    );

    await this.userCommandRepository.save(user);
  }
}
