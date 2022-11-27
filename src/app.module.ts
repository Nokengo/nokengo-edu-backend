import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';
import { MeetingsModule } from './presentation/meetings/meetings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      schema: process.env.TYPEORM_SCHEMA,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/src/infra/typeorm/migrations/*{.ts,.js}'],
      synchronize: true,
      cli: {
        migrationsDir: 'src/infra/typeorm/migrations',
      },
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    GatewayModule,
    MeetingsModule,
  ],
})
export class AppModule {}
