import { Module } from '@nestjs/common';
import { TexturesModule } from './textures/textures.module';
import { WeatherModule } from './weather/weather.module';
import { CropModule } from './crop/crop.module';

@Module({
    imports: [
        TexturesModule,
        WeatherModule,
        CropModule,
    ],
})
export class ApiModule {}
