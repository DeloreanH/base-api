import { Module } from '@nestjs/common';
import { SectorsController } from './sectors.controller';
import { SectorsService } from './Sectors.service';

@Module({
  controllers: [SectorsController],
  providers: [SectorsService],
})
export class SectorsModule {}
