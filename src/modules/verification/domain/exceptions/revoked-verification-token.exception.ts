import { BadRequestException } from '@nestjs/common';

export class RevokedVerificationException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Verification has revoked',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_REVOKED',
    });
  }
}
