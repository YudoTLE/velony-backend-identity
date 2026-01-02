import { AsyncLocalStorage } from 'async_hooks';

import { Module } from '@nestjs/common';

import {
  PgService,
  type TransactionContext,
} from '@identity-infrastructure/persistence/pg/pg.service';

@Module({
  providers: [
    PgService,
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage<TransactionContext>(),
    },
  ],
  exports: [PgService],
})
export class PgModule {}
