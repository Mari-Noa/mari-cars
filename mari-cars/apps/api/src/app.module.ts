import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { loadEnv } from './config/env';
import { HealthModule } from './health/health.module';

@Module({
  imports: [MongooseModule.forRoot(loadEnv().MONGODB_URI), HealthModule],
})
export class AppModule {}
