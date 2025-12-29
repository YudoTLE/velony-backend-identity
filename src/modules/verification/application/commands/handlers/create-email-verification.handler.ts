import { randomInt } from 'crypto';

import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Email } from 'src/modules/user/domain/value-objects/email.vo';
import { EmailVerificationEntity } from 'src/modules/verification/domain/entities/email-verification.entity';
import { VerificationCommandRepository } from 'src/modules/verification/domain/repositories/verification.command.repository';

import { CreateEmailVerificationCommand } from '../create-email-verification.command';

@CommandHandler(CreateEmailVerificationCommand)
export class CreateEmailVerificationHandler implements ICommandHandler<CreateEmailVerificationCommand> {
  constructor(
    private readonly verificationCommandRepository: VerificationCommandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // TODO: Wrap revoke + create in a transaction to ensure atomicity
  async execute(command: CreateEmailVerificationCommand): Promise<void> {
    const activeVerification =
      await this.verificationCommandRepository.findByUserId(
        command.context.userId,
        'email',
      );
    if (activeVerification) {
      activeVerification.revoke();
      await this.verificationCommandRepository.save(activeVerification);
    }

    const verification = EmailVerificationEntity.create({
      userId: command.props.userId,
      token: this.generateOTP(),
      value: Email.create(command.props.email),
      ttl: command.props.ttl,
    });
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

  private generateOTP(): string {
    const otp = randomInt(0, 1000000);
    return otp.toString().padStart(6, '0');
  }
}
