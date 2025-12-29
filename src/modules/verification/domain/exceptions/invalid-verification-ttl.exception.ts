import { BadRequestException } from '@nestjs/common';

export class InvalidVerificationTtlException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Verification TTL must be positive',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_TTL_INVALID',
    });
  }
}
