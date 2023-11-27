import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractModule } from './app/extract/extract.module';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './app/data/data.module';

@Module({
  imports: [
    ExtractModule, 
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      ssl: true,
    }),
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
