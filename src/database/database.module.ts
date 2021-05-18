import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        // Get the mongoDb configuration
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
      inject: [config.KEY],
    }),
  ],

  providers: [
    {
      provide: 'API_KEY',
      useValue: '45465',
    },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}
