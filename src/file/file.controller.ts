import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('destinationFolder') destinationFolder: string,
    @Body('destinationPath') destinationPath: string,
  ) {
    const pathPrefix = 'C:/Users/layne_000/Documents/Code/lbnet-storage';
    const fileName = file.originalname;
    const destinationFolderPath = join(
      pathPrefix,
      destinationFolder,
      destinationPath,
    );
    const destination = join(destinationFolderPath, fileName);

    // Ensure the destination folder exists
    if (!existsSync(destinationFolderPath)) {
      mkdirSync(destinationFolderPath, { recursive: true }); // Create folder recursively
    }

    const writeStream = createWriteStream(destination, { flags: 'w' });
    writeStream.write(file.buffer);
    writeStream.end();
    writeStream.on('close', function () {
      console.log(`[Log] File ${destination} written`);
    });
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
