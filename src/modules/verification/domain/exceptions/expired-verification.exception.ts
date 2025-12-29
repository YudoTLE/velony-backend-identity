import { BadRequestException } from '@nestjs/common';

export class ExpiredVerificationException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Verification has expired',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_EXPIRED',
    });
  }
}
