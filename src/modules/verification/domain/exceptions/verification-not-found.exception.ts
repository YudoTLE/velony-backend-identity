import { NotFoundException } from '@nestjs/common';

export class VerificationNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super({
      message: message ?? 'Verification not found',
      error: 'Not Found',
      statusCode: 404,
      errorCode: 'VERIFICATION_NOT_FOUND',
    });
  }
}
