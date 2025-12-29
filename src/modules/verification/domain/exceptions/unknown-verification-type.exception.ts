import { BadRequestException } from '@nestjs/common';

export class UnknownVerificationTypeException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Unknown verification type',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_TYPE_UNKNOWN',
    });
  }
}
