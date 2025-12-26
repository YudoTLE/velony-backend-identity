import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/modules/user/domain/exceptions/user-not-found.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Name } from 'src/modules/user/domain/value-objects/name.vo';

import { UpdateUserNameCommand } from '../update-user-name.command';

@CommandHandler(UpdateUserNameCommand)
export class UpdateUserNameHandler implements ICommandHandler<UpdateUserNameCommand> {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async execute(command: UpdateUserNameCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updateName(Name.create(command.props.name));

    await this.userCommandRepository.save(user);
  }
}
