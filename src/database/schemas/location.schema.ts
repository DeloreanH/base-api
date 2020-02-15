import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const locationSchema = new Schema({
    sectorId: {
        type: Schema.Types.ObjectId,
        ref: modelName.SECTOR,
    },
    name: {
        type: String,
        unique: true,
    },
    ASNM: {
        type: Number,
    },
    texturesIds: [{
        type: Schema.Types.ObjectId,
        ref: modelName.TEXTURE,
    }],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
