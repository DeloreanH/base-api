import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const StudySchema = new Schema({
    texturesId: {
        type: Schema.Types.ObjectId,
        ref: modelName.TEXTURE,
    },
    sectorId: {
        type: Schema.Types.ObjectId,
        ref: modelName.SECTOR,
    },
    sectorLocationId: {
        type: Schema.Types.ObjectId,
        ref: modelName.SECTOR_LOCATION,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    month: {
        type: Number,
    },
    ph: {
        type: Number,
    },
    mo: {
        type: Number,
    },
    ce: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
