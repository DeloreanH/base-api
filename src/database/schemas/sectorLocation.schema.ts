import { Schema } from 'mongoose';
import { modelName } from '../model-names';
import { textureSchema } from './texture.schema';

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
    textures: [textureSchema],
}, {timestamps: true});
