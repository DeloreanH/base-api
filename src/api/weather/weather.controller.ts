import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WeatherService } from './weather.service';
import { IWeather } from '../../common/interfaces/interfaces';
import { createWeatherDTO } from '../../common/dtos/createWeather.dto';
import { deleteWeatherDTO } from '../../common/dtos/deleteWeather.dto';
import { updateWeatherDTO } from '../../common/dtos/updateweather.dto';
import { restoreWeatherDTO } from '../../common/dtos/restoreWeather.dto';

@Controller('weather')
@UseGuards(AuthGuard('jwt'))
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get('list')
    async list(): Promise<IWeather[]> {
        return this.weatherService.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<IWeather[]> {
        return this.weatherService.listTrashed();
    }
    @Post('create')
    async create(@Body() createweatherDto: createWeatherDTO): Promise<IWeather> {
        return this.weatherService.create(createweatherDto);
    }
    @Post('update')
    async update(@Body() updateweatherDto: updateWeatherDTO): Promise<IWeather> {
        return this.weatherService.update(updateweatherDto);
    }
    @Post('delete')
    async delete(@Body() deleteweatherDto: deleteWeatherDTO): Promise<IWeather> {
        return this.weatherService.delete(deleteweatherDto);
    }
    @Post('restore')
    async restore(@Body() restoreweatherDto: restoreWeatherDTO): Promise<IWeather> {
        return this.weatherService.restore(restoreweatherDto);
    }
}
