import { Schema } from 'mongoose';

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
    weatherType: {
        type: String,
    },
}, {timestamps: true});
