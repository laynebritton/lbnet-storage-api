import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  uploadFile(
    file: Express.Multer.File,
    destinationFolder: string,
    destinationPath: string,
  ) {
    return new Promise<void>((resolve) => {
      const fileName = file.originalname;
      const destinationFolderPath = join(
        this.configService.get<string>('ROOT_DIRECTORY'),
        destinationFolder,
        destinationPath,
      );
      const destination = join(destinationFolderPath, fileName);

      // Ensure the destination folder exists
      if (!existsSync(destinationFolderPath)) {
        mkdirSync(destinationFolderPath, { recursive: true });
      }

      const writeStream = createWriteStream(destination, { flags: 'w' });
      writeStream.write(file.buffer);
      writeStream.end();
      writeStream.on('close', function () {
        console.log(`[Log] File ${destination} written`);
        resolve;
      });
    });
  }

  getFile(destination: string, fileName: string): StreamableFile {
    const path = join(
      this.configService.get<string>('ROOT_DIRECTORY'),
      destination,
      fileName,
    );
    const fileStream = createReadStream(path);

    console.log(`[Log] File ${path} downloaded at: ${Date.now()}`)

    return new StreamableFile(fileStream, {
      type: 'application/octet-stream',
      disposition: `attachment; filename="${fileName}"`,
    });
  }
}
