import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { GetFileDto } from './dto/get-file.dto';

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
    if (API_KEY !== this.configService.get('API_KEY')) {
      return HttpStatus.UNAUTHORIZED;
    }
    this.fileService.uploadFile(file, destinationFolder, destinationPath);
  }

  @Get('get')
  getFile(@Query() query: GetFileDto): StreamableFile {
    const { destination, fileName, API_KEY } = query;
    if (API_KEY !== this.configService.get('API_KEY')) {
      console.log(`[Log] Unauthorized access attempt for: ${destination} / ${fileName} - using API_KEY: ${API_KEY}`)
      return null;
    }
    return this.fileService.getFile(destination, fileName);
  }
}
