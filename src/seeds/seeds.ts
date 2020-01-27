import 'dotenv/config';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

// schemas
import { modelName } from '../database/model-names';
import { monthSchema } from '../database/schemas/month.schema';
import { textureSchema } from '../database/schemas/texture.schema';
import { weatherSchema } from '../database/schemas/weather.schema';


// data
import { monthSeed } from './data/month.seed';
import { textureSeed } from './data/texture.seed';
import { weatherSeed } from './data/weather.seed';


// modelos
const month   = mongoose.model(modelName.MONTH, monthSchema);
const texture = mongoose.model(modelName.TEXTURE, textureSchema);
const weather = mongoose.model(modelName.WEATHER, weatherSchema);

execute();

// creacion de las semillas
async  function up() {
    console.log('SEEDING THE DATABASE');
    await month.insertMany(monthSeed);
    await texture.insertMany(textureSeed);
    await weather.insertMany(weatherSeed);
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