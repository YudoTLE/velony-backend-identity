import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvalidVerificationTokenException } from 'src/modules/verification/domain/exceptions/invalid-verification-token.exception';
import { VerificationNotFoundException } from 'src/modules/verification/domain/exceptions/verification-not-found.exception';
import { VerificationCommandRepository } from 'src/modules/verification/domain/repositories/verification.command.repository';

import { VerifyEmailVerificationCommand } from '../verify-email-verification.command';

@CommandHandler(VerifyEmailVerificationCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailVerificationCommand> {
  constructor(
    private readonly verificationCommandRepository: VerificationCommandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: VerifyEmailVerificationCommand): Promise<void> {
    const verification = await this.verificationCommandRepository.findByUserId(
      command.context.userId,
      'email',
    );
    if (!verification) {
      throw new VerificationNotFoundException();
    }

    if (!verification.verifyToken(command.props.token)) {
      throw new InvalidVerificationTokenException();
    }

    verification.verify();

    await this.verificationCommandRepository.save(verification);

    const domainEvents = verification.getDomainEvents();
    for (const event of domainEvents) {
      await this.eventEmitter.emitAsync(event.type, event, {
        userId: command.context.userId,
        correlationId: command.id,
      });
    }
    verification.clearDomainEvents();
  }
}
