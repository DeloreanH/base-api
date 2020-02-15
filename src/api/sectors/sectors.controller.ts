import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SectorsService } from './Sectors.service';
import { ISector } from '../../common/interfaces/interfaces';
import { createSectorDTO } from '../../common/dtos/createSector.dto';
import { updateSectorDTO } from '../../common/dtos/updateSector.dto';
import { deleteSectorDTO } from '../../common/dtos/deleteSector.dto';
import { restoreSectorDTO } from '../../common/dtos/restoreSector.dto';

@Controller('sectors')
@UseGuards(AuthGuard('jwt'))
export class SectorsController {
    constructor(private sectorservice: SectorsService) {}

    @Get('list')
    async list(): Promise<ISector[]> {
        return this.sectorservice.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<ISector[]> {
        return this.sectorservice.listTrashed();
    }
    @Post('create')
    async create(@Body() createSectorDto: createSectorDTO ): Promise<ISector> {
        return this.sectorservice.create(createSectorDto);
    }
    @Post('update')
    async update(@Body() updateSectorDto: updateSectorDTO): Promise<ISector> {
        return this.sectorservice.update(updateSectorDto);
    }
    @Post('delete')
    async delete(@Body() deleteSectorDto: deleteSectorDTO): Promise<ISector> {
        return this.sectorservice.delete(deleteSectorDto);
    }
    @Post('restore')
    async restore(@Body() restoreSectorDto: restoreSectorDTO): Promise<ISector> {
        return this.sectorservice.restore(restoreSectorDto);
    }
}
