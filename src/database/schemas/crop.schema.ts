import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const cropSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
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
    organicMaterialMinPercentage: {
        type: Number,
    },
    organicMaterialMaxPercentage: {
        type: Number,
    },
    texturesId: [{
        type: Schema.Types.ObjectId,
        ref: modelName.TEXTURE,
    }],
    weatherId: {
        type: Schema.Types.ObjectId,
        ref: modelName.WEATHER,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
