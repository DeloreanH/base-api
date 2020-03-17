import 'dotenv/config';
import * as mongoose from 'mongoose';

// schemas
import { modelName } from '../database/model-names';
import { monthSchema } from '../database/schemas/month.schema';
import { textureSchema } from '../database/schemas/texture.schema';
import { weatherSchema } from '../database/schemas/weather.schema';
import { sectorSchema } from '../database/schemas/sector.schema';
import { sectorHumiditySchema } from '../database/schemas/sectorHumidity.schema';
import { sectorLightSchema } from '../database/schemas/sectorLight.schema';
import { sectorTemperatureSchema } from '../database/schemas/sectorTemperature.schema';
import { cropSchema } from '../database/schemas/crop.schema';

// data
import { monthSeed } from './data/month.seed';
import { textureSeed } from './data/texture.seed';
import { weatherSeed } from './data/weather.seed';
import { sectorSeed } from './data/sector.seed';
import { sectorHumiditySeed } from './data/sectorHumidity.seed';
import { sectorLightSeed } from './data/sectorLight.seed';
import { sectorLocationSeed } from './data/sectorLocation.seed';
import { sectorTemperatureSeed } from './data/sectorTemperature.seed';
import { CropSeed } from './data/crop.seed';

// modelos
const month              = mongoose.model(modelName.MONTH, monthSchema);
const texture            = mongoose.model(modelName.TEXTURE, textureSchema);
const weather            = mongoose.model(modelName.WEATHER, weatherSchema);
// const sector             = mongoose.model(modelName.SECTOR, sectorSchema);
// const sectorHumidity     = mongoose.model(modelName.SECTOR_HUMIDITY, sectorHumiditySchema);
// const sectorLight        = mongoose.model(modelName.SECTOR_LIGHT, sectorLightSchema);
// const sectorTemperature  = mongoose.model(modelName.SECTOR_TEMPERATURE, sectorTemperatureSchema);
// const crop               = mongoose.model(modelName.CROP, cropSchema);

execute();

// creacion de las semillas
async  function up() {
    console.log('SEEDING THE DATABASE');
    await month.insertMany(monthSeed);
    await texture.insertMany(textureSeed);
    await weather.insertMany(weatherSeed);
    // await sector.insertMany(sectorSeed);
    // await sectorHumidity.insertMany(sectorHumiditySeed);
    // await sectorLight.insertMany(sectorLightSeed);
    // await sectorTemperature.insertMany(sectorTemperatureSeed);
    // await crop.insertMany(CropSeed);
}

async function closeConn() {
    console.log('CLOSING CONNECTION WITH DB');
    await mongoose.connection.close();
}

async function openConn() {
    console.log('OPENING CONNECTION WITH DB');
    const conn = await mongoose.connect(
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
            { useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true },
            );
    console.log('DROPPING EXISTING DATA');
    await conn.connection.dropDatabase();
}

// ejecutar  los metodos down y up respectivamente
async function execute() {
    try {
        await openConn();
        await up();
        await closeConn();
        console.log('ALL DONE...');

    } catch (e) {
        console.log(e);
        await closeConn();
    }
}
