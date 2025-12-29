import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TypedConfigService } from 'src/config/typed-config.service';
import type { EventContext } from 'src/shared/application/event-context.interface';
import { KafkaService } from 'src/shared/infrastructure/events/kafka/kafka.service';

import { EmailVerificationIssuedDomainEvent } from '../../domain/events/email-verification-issued.domain-event';

@Injectable()
export class EmailVerificationIssuedEventHandler {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  @OnEvent(EmailVerificationIssuedDomainEvent.TYPE)
  handle(
    event: EmailVerificationIssuedDomainEvent,
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
            user_id: event.props.userId,
            token: event.props.token,
            value: event.props.value,
            issued_at: event.props.issuedAt,
            expires_at: event.props.expiresAt,
          },
        }),
      ),
    });
  }
}
