import { Schema } from 'mongoose';
import { modelName } from '../model-names';
import { textureSchema } from './texture.schema';

export const cropSchema = new Schema({
    scientificName: {
        type: String,
        unique: true,
    },
    phSince: {
        type: Number,
    },
    phUntil: {
        type: Number,
    },
    temperatureSince: {
        type: Number,
    },
    temperatureUntil: {
        type: Number,
    },
    altitudeSince: {
        type: Number,
    },
    altitudeUntil: {
        type: Number,
    },
    hoursSince: {
        type: Number,
    },
    hoursUntil: {
        type: Number,
    },
    typographySince: {
        type: Number,
    },
    typographyUntil: {
        type: Number,
    },
    humiditySince: {
        type: Number,
    },
    humidityUntil: {
        type: Number,
    },
    conductivitySince: {
        type: Number,
    },
    conductivityUntil: {
        type: Number,
    },
    organicMaterialPercentage: {
        type: Number,
    },
    textures: [textureSchema],
    weatherId: {
        type: Schema.Types.ObjectId,
        ref: modelName.WEATHER,
    },
}, {timestamps: true});
