import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: '45465',
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
