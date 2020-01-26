import { Module } from '@nestjs/common';
import { TexturesModule } from './textures/textures.module';
import { WeatherModule } from './weather/weather.module';
import { CropModule } from './crop/crop.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        TexturesModule,
        WeatherModule,
        CropModule,
        AdminModule,
    ],
})
export class ApiModule {}
