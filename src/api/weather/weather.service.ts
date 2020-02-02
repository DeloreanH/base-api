import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { IWeather } from '../../common/interfaces/interfaces';
import { createWeatherDTO } from '../../common/dtos/createWeather.dto';
import { updateWeatherDTO } from '../../common/dtos/updateweather.dto';
import { deleteWeatherDTO } from '../../common/dtos/deleteWeather.dto';
import { restoreWeatherDTO } from '../../common/dtos/restoreWeather.dto';

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(modelName.WEATHER) private weatherModel: Model<IWeather>,
    ) {}

    public async list(): Promise<IWeather[]> {
        return await this.weatherModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<IWeather[]> {
        return await this.weatherModel.find({ deleted: { $ne: false } });
    }
    public async create(createWeatherDto: createWeatherDTO): Promise<IWeather> {
        const weather = new this.weatherModel(createWeatherDto);
        return await weather.save();
    }
    public async update(updateWeatherDto: updateWeatherDTO): Promise<IWeather> {
        const weather = await this.findById(updateWeatherDto._id);
        if (!weather) {
            throw new HttpException('weather not found', HttpStatus.BAD_REQUEST);
        } else {
            weather.name = updateWeatherDto.name;
            return await weather.save();
        }
    }
    public async delete(deleteWeatherDto: deleteWeatherDTO): Promise<IWeather> {
        const weather = await this.findById(deleteWeatherDto._id);
        if (!weather) {
            throw new HttpException('weather not found', HttpStatus.BAD_REQUEST);
        } else {
            weather.deleted = true;
            return await weather.save();
        }
    }
    public async restore(restoreWeatherDto: restoreWeatherDTO): Promise<IWeather> {
        const weather = await this.findById(restoreWeatherDto._id);
        if (!weather) {
            throw new HttpException('weather not found', HttpStatus.BAD_REQUEST);
        } else {
            weather.deleted = false;
            return await weather.save();
        }
    }
    public async findById(id: string): Promise<IWeather> {
        return await this.weatherModel.findOne({_id: id});
    }
}
