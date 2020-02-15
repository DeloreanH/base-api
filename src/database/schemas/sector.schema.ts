import { Schema } from 'mongoose';
import { modelName } from '../model-names';
import { sectorHumiditySchema } from './sectorHumidity.schema';
import { sectorLightSchema } from './sectorLight.schema';
import { sectorTemperatureSchema } from './sectorTemperature.schema';

export const sectorSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    pendingSince: {
        type: Number,
    },
    pendingUntil: {
        type: Number,
    },
    weatherId: {
        type: Schema.Types.ObjectId,
        ref: modelName.WEATHER,
    },
    sectorHumidities: [sectorHumiditySchema],
    sectorLights: [sectorLightSchema],
    sectorTemperatures: [sectorTemperatureSchema],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
