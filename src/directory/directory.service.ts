import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdirSync, readdir } from 'fs';
import { join } from 'path';

@Injectable()
export class DirectoryService {
  constructor(private configService: ConfigService) {}

  getDirectory(destination: string) {
    const joined = join(this.configService.get<string>('ROOT_DIRECTORY'), destination);
    return readdirSync(joined,  { withFileTypes: true });
  }
}
