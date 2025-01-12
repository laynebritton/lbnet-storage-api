import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { DirectoryModule } from './directory/directory.module';
import 'reflect-metadata';

@Module({
  imports: [FileModule, ConfigModule.forRoot(), DirectoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
