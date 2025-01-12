import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [DirectoryController],
  providers: [DirectoryService, ConfigService],
})
export class DirectoryModule {}
