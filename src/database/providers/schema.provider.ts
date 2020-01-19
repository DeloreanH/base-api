import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { userSchema } from '../../database/schemas/user.schema';
import { sesionSchema } from '../schemas/sesion.schema';
import { cropSchema } from '../schemas/crop.schema';
import { sectorSchema } from '../schemas/sector.schema';
import { sectorLocationSchema } from '../schemas/sectorLocation.schema';
import { sectorTemperatureSchema } from '../schemas/sectorTemperature.schema';
import { textureSchema } from '../schemas/texture.schema';
import { weatherSchema } from '../schemas/weather.schema';
import { sectorHumiditySchema } from '../schemas/sectorHumidity.schema';
import { sectorLightSchema } from '../schemas/sectorLight.schema';
import { monthSchema } from '../schemas/month.schema';
import { passwordResetSchema } from '../schemas/passwordReset.schema';

export const schemaProvider = [
    MongooseModule.forFeature([
        { name: modelName.USER, schema: userSchema },
        { name: modelName.SESION, schema: sesionSchema },
        { name: modelName.CROP, schema: cropSchema },
        { name: modelName.SECTOR, schema: sectorSchema },
        { name: modelName.SECTOR_HUMIDITY, schema: sectorLightSchema },
        { name: modelName.SECTOR_LIGHT, schema: sectorHumiditySchema },
        { name: modelName.SECTOR_LOCATION, schema: sectorLocationSchema },
        { name: modelName.SECTOR_TEMPERATURE, schema: sectorTemperatureSchema },
        { name: modelName.TEXTURE, schema: textureSchema },
        { name: modelName.WEATHER, schema: weatherSchema },
        { name: modelName.MONTH, schema: monthSchema },
        { name: modelName.PASSWORD_RESET, schema: passwordResetSchema },
    ]),
  ];
