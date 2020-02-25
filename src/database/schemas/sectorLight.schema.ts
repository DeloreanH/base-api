import { Schema } from 'mongoose';

export const sectorLightSchema = new Schema({
    month: {
        type: Number,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
});
