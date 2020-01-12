import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const sectorTemperatureSchema = new Schema({
    sectorId: {
        type: Schema.Types.ObjectId,
        ref: modelName.SECTOR,
    },
    month: {
        type: String,
        unique: true,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
    average: {
        type: Number,
    },
}, {timestamps: true});
