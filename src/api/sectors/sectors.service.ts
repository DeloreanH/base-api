import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ISector } from '../../common/interfaces/interfaces';
import { createSectorDTO } from '../../common/dtos/createSector.dto';
import { updateSectorDTO } from '../../common/dtos/updateSector.dto';
import { deleteSectorDTO } from '../../common/dtos/deleteSector.dto';
import { restoreSectorDTO } from '../../common/dtos/restoreSector.dto';

@Injectable()
export class SectorsService {
    constructor(
        @InjectModel(modelName.SECTOR) private sectorModel: Model<ISector>,
    ) {}

    public async list(): Promise<ISector[]> {
        return await this.sectorModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ISector[]> {
        return await this.sectorModel.find({ deleted: { $ne: false } });
    }
    public async create(createSectorDto: createSectorDTO): Promise<ISector> {
        const isMatch = await this.findByName(createSectorDto.name);
        if (isMatch) {
            throw new HttpException('Name already registered', HttpStatus.BAD_REQUEST);
        }
        const sector = new this.sectorModel(createSectorDto);
        return await sector.save();
    }
    public async update(updateSectorDto: updateSectorDTO): Promise<ISector> {
        const sector = await this.findById(updateSectorDto._id);
        if (!sector) {
            throw new HttpException('Sector not found', HttpStatus.BAD_REQUEST);
        } else {
            const isMatch = await this.findByName(updateSectorDto.name);
            if ( isMatch && !sector._id.equals(isMatch._id)) {
                throw new HttpException('Name already registered', HttpStatus.BAD_REQUEST);
            }
            sector.name               = updateSectorDto.name;
            sector.pendingSince       = updateSectorDto.pendingSince;
            sector.pendingUntil       = updateSectorDto.pendingUntil;
            sector.sectorHumidities   = updateSectorDto.sectorHumidities;
            sector.sectorLights       = updateSectorDto.sectorLights;
            sector.sectorTemperatures = updateSectorDto.sectorTemperatures;
            sector.weatherId          = updateSectorDto.weatherId;
            return await sector.save();
        }
    }
    public async delete(deleteSectorDto: deleteSectorDTO): Promise<ISector> {
        const sector = await this.findById(deleteSectorDto._id);
        if (!sector) {
            throw new HttpException('Sector not found', HttpStatus.BAD_REQUEST);
        } else {
            sector.deleted = true;
            return await sector.save();
        }
    }
    public async restore(restoreSectorDto: restoreSectorDTO): Promise<ISector> {
        const sector = await this.findById(restoreSectorDto._id);
        if (!sector) {
            throw new HttpException('Sector not found', HttpStatus.BAD_REQUEST);
        } else {
            sector.deleted = false;
            return await sector.save();
        }
    }
    public async findById(id: string): Promise<ISector> {
        return await this.sectorModel.findOne({_id: id});
    }
    public async findByName(name: string): Promise<ISector> {
        const clean = name.toLowerCase();
        return await this.sectorModel.findOne({ name: clean});
    }
}
