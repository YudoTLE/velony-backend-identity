import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TypedConfigService } from 'src/config/typed-config.service';
import type { EventContext } from 'src/shared/application/event-context.interface';
import { KafkaService } from 'src/shared/infrastructure/events/kafka/kafka.service';

import { EmailVerificationVerifiedDomainEvent } from '../../domain/events/email-verification-verified.domain-event';

@Injectable()
export class EmailVerificationVerifiedEventHandler {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  @OnEvent(EmailVerificationVerifiedDomainEvent.TYPE)
  handle(
    event: EmailVerificationVerifiedDomainEvent,
    context: EventContext,
  ): void {
    this.kafkaService.client.emit('identity.user', {
      key: event.aggregateId,
      value: Buffer.from(
        JSON.stringify({
          meta: {
            event_id: event.id,
            event_type: event.type,
            user_id: context.userId,
            correlation_id: context.correlationId,
            source: this.configService.get('SERVICE_NAME'),
            occurred_at: event.occurredAt.toISOString(),
          },
          data: {
            verified_at: event.props.verifiedAt,
          },
        }),
      ),
    });
  }
}
