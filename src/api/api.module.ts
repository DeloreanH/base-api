import { Module } from '@nestjs/common';
import { TexturesModule } from './textures/textures.module';
import { WeatherModule } from './weather/weather.module';
import { CropModule } from './crop/crop.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { StudyModule } from './study/study.module';

@Module({
    imports: [
        TexturesModule,
        WeatherModule,
        CropModule,
        AdminModule,
        UsersModule,
        StudyModule,
    ],
})
export class ApiModule {}
