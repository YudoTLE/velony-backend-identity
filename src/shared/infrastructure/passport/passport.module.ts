import { Module } from '@nestjs/common';

import { JwtCookieAuthGuard } from './guards/jwt-cookie-auth.guard';
import { JwtCookieStrategy } from './strategies/jwt-cookie.strategy';

@Module({
  providers: [JwtCookieStrategy, JwtCookieAuthGuard],
  exports: [JwtCookieAuthGuard],
})
export class PassportModule {}
