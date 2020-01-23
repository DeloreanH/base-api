import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { IWeather } from '../../common/interfaces/interfaces';
import { createWeatherDTO } from '../../common/dtos/createWeather.dto';
import { updateWeatherDTO } from '../../common/dtos/updateweather.dto';
import { deleteWeatherDTO } from '../../common/dtos/deleteWeather.dto';

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(modelName.WEATHER) private weatherModel: Model<IWeather>,
    ) {}

    public async list(): Promise<IWeather[]> {
        return await this.weatherModel.find({});
    }
    public async create(createWeatherDto: createWeatherDTO): Promise<IWeather> {
        const weather = new this.weatherModel(createWeatherDto);
        return await weather.save();
    }
    public async update(updateWeatherDto: updateWeatherDTO): Promise<IWeather> {
        const weather = await this.findById(updateWeatherDto.id);
        if (!weather) {
            throw new HttpException('weather not found', HttpStatus.BAD_REQUEST);
        } else {
            weather.name = updateWeatherDto.name;
            return await weather.save();
        }
    }
    public async delete(deleteWeatherDto: deleteWeatherDTO): Promise<IWeather> {
        const weather = await this.findById(deleteWeatherDto.id);
        if (!weather) {
            throw new HttpException('weather not found', HttpStatus.BAD_REQUEST);
        } else {
            return await weather.remove();
        }
    }
    public async findById(id: string): Promise<IWeather> {
        return await this.weatherModel.findOne({_id: id});
    }
}
