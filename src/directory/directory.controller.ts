import { Controller, Get, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { GetDirectoryDto } from './dto/get-directory.dto';

@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}
  
  @Get()
  getDirectory(@Query() query: GetDirectoryDto) {
    const { destination } = query;
    return this.directoryService.getDirectory(destination);
  }
}
