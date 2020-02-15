import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocationsService } from './locations.service';
import { ILocation } from '../../common/interfaces/interfaces';
import { createLocationDTO } from '../../common/dtos/createLocation.dto';
import { updateLocationDTO } from '../../common/dtos/updateLocation.dto';
import { deleteLocationDTO } from '../../common/dtos/deleteLocation.dto';
import { restoreLocationDTO } from '../../common/dtos/restoreLocation.dto';
import { createManyLocationDTO } from 'src/common/dtos/createManyLocation.dto';

@Controller('locations')
@UseGuards(AuthGuard('jwt'))
export class LocationsController {
    constructor(private Locationservice: LocationsService) {}

    @Get('list')
    async list(): Promise<ILocation[]> {
        return this.Locationservice.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<ILocation[]> {
        return this.Locationservice.listTrashed();
    }
    @Post('create')
    async create(@Body() createLocationDto: createLocationDTO ): Promise<ILocation> {
        return this.Locationservice.create(createLocationDto);
    }
    @Post('create-many')
    async createMany(@Body() createManyLocationDto: createManyLocationDTO ): Promise<ILocation[]> {
        return this.Locationservice.createMany(createManyLocationDto);
    }
    @Post('update')
    async update(@Body() updateLocationDto: updateLocationDTO): Promise<ILocation> {
        return this.Locationservice.update(updateLocationDto);
    }
    @Post('delete')
    async delete(@Body() deleteLocationDto: deleteLocationDTO): Promise<ILocation> {
        return this.Locationservice.delete(deleteLocationDto);
    }
    @Post('restore')
    async restore(@Body() restoreLocationDto: restoreLocationDTO): Promise<ILocation> {
        return this.Locationservice.restore(restoreLocationDto);
    }
}
