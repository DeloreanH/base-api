import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ICrop } from '../../common/interfaces/interfaces';
import { createCropDTO } from '../../common/dtos/createCrop.dto';
import { updateCropDTO } from '../../common/dtos/updateCrop.dto';
import { deleteCropDTO } from '../../common/dtos/deleteCrop.dto';
import { restoreCropDTO } from '../../common/dtos/restoreCrop.dto';

@Injectable()
export class CropService {
    constructor(
        @InjectModel(modelName.CROP) private cropModel: Model<ICrop>,
    ) {}

    public async list(): Promise<ICrop[]> {
        return await this.cropModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<ICrop[]> {
        return await this.cropModel.find({ deleted: { $ne: false } });
    }
    public async create(createCropDto: createCropDTO): Promise<ICrop> {
        const crop = new this.cropModel(createCropDto);
        return await crop.save();
    }
    public async update(updateCropDto: updateCropDTO): Promise<ICrop> {
        const crop = await this.findById(updateCropDto._id);
        if (!crop) {
            throw new HttpException('crop not found', HttpStatus.BAD_REQUEST);
        } else {
            crop.name = updateCropDto.name;
            crop.scientificName = updateCropDto.scientificName;
            crop.phSince = updateCropDto.phSince;
            crop.phUntil = updateCropDto.phUntil;
            crop.temperatureSince = updateCropDto.temperatureSince ;
            crop.temperatureUntil = updateCropDto.temperatureUntil;
            crop.altitudeSince = updateCropDto.altitudeSince;
            crop.altitudeUntil = updateCropDto.altitudeUntil;
            crop.hoursSince = updateCropDto.hoursSince;
            crop.hoursUntil = updateCropDto.hoursUntil;
            crop.typographySince = updateCropDto.typographySince;
            crop.typographyUntil = updateCropDto.typographyUntil;
            crop.humiditySince = updateCropDto.humiditySince;
            crop.humidityUntil = updateCropDto.humidityUntil;
            crop.conductivitySince = updateCropDto.conductivitySince ;
            crop.conductivityUntil = updateCropDto.conductivityUntil;
            crop.organicMaterialMinPercentage = updateCropDto.organicMaterialMinPercentage;
            crop.organicMaterialMaxPercentage = updateCropDto.organicMaterialMaxPercentage;
            crop.texturesId = updateCropDto.texturesId;
            crop.weatherId = updateCropDto.weatherId;
            return await crop.save();
        }
    }
    public async delete(deleteCropDto: deleteCropDTO): Promise<ICrop> {
        const crop = await this.findById(deleteCropDto._id);
        if (!crop) {
            throw new HttpException('crop not found', HttpStatus.BAD_REQUEST);
        } else {
            crop.deleted = true;
            return await crop.save();
        }
    }
    public async retore(restoreCropDto: restoreCropDTO): Promise<ICrop> {
        const crop = await this.findById(restoreCropDto._id);
        if (!crop) {
            throw new HttpException('crop not found', HttpStatus.BAD_REQUEST);
        } else {
            crop.deleted = false;
            return await crop.save();
        }
    }
    public async findById(id: string): Promise<ICrop> {
        return await this.cropModel.findOne({_id: id});
    }
}
