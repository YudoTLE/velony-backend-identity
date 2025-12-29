import { BadRequestException } from '@nestjs/common';

export class InvalidVerificationTokenException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Invalid verification token',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_TOKEN_INVALID',
    });
  }
}
