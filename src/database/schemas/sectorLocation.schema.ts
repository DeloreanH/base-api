import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const sectorLocationSchema = new Schema({
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
    texturesId: [{
        type: Schema.Types.ObjectId,
        ref: modelName.TEXTURE,
    }],
}, {timestamps: true});
