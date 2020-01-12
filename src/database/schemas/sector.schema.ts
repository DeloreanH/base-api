import { Schema } from 'mongoose';
import { modelName } from '../model-names';

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
}, {timestamps: true});
