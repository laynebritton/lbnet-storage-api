import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('destinationFolder') destinationFolder: string,
    @Body('destinationPath') destinationPath: string,
    @Body('API_KEY') API_KEY: string,
  ) {
    if(API_KEY !== this.configService.get("API_KEY")) {
      return HttpStatus.UNAUTHORIZED;
    }
    this.fileService.uploadFile(file, destinationFolder, destinationPath);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
