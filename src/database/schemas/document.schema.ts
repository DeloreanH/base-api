import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const DocumentSchema = new Schema({
    cropId: {
        type: Schema.Types.ObjectId,
        ref: modelName.CROP,
    },
    name: {
        type: String,
        unique: true,
    },
    path: {
        type: String,
    },
}, {timestamps: true});
