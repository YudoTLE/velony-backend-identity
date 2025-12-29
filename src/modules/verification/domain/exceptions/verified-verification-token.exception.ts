import { BadRequestException } from '@nestjs/common';

export class VerifiedVerificationException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message ?? 'Verification has verified',
      statusCode: 400,
      error: 'Bad Request',
      errorCode: 'VERIFICATION_VERIFIED',
    });
  }
}
