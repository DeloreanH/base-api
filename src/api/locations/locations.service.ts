import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ILocation } from '../../common/interfaces/interfaces';
import { createLocationDTO } from '../../common/dtos/createLocation.dto';
import { updateLocationDTO } from '../../common/dtos/updateLocation.dto';
import { deleteLocationDTO } from '../../common/dtos/deleteLocation.dto';
import { restoreLocationDTO } from '../../common/dtos/restoreLocation.dto';
import { createManyLocationDTO } from '../../common/dtos/createManyLocation.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(modelName.LOCATION) private locationModel: Model<ILocation>,
    ) {}

    public async list(): Promise<ILocation[]> {
        return await this.locationModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ILocation[]> {
        return await this.locationModel.find({ deleted: { $ne: false } });
    }
    public async create(createLocationDto: createLocationDTO): Promise<ILocation> {
        const location = new this.locationModel(createLocationDto);
        return await location.save();
    }
    public async createMany(createManyLocationDto: createManyLocationDTO): Promise<ILocation[]> {
        return await this.locationModel.insertMany(createManyLocationDto.locations);
    }
    public async update(updateLocationDto: updateLocationDTO): Promise<ILocation> {
        const location = await this.findById(updateLocationDto._id);
        if (!location) {
            throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
        } else {
            location.sectorId    = updateLocationDto.sectorId;
            location.name        = updateLocationDto.name;
            location.texturesIds = updateLocationDto.texturesIds;
            location.ASNM        = updateLocationDto.ASNM;
            return await location.save();
        }
    }
    public async delete(deleteLocationDto: deleteLocationDTO): Promise<ILocation> {
        const location = await this.findById(deleteLocationDto._id);
        if (!location) {
            throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
        } else {
            location.deleted = true;
            return await location.save();
        }
    }
    public async restore(restoreLocationDto: restoreLocationDTO): Promise<ILocation> {
        const location = await this.findById(restoreLocationDto._id);
        if (!location) {
            throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
        } else {
            location.deleted = false;
            return await location.save();
        }
    }
    public async findById(id: string): Promise<ILocation> {
        return await this.locationModel.findOne({_id: id});
    }
}
