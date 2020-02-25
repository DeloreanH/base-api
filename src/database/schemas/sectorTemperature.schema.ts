import { Schema } from 'mongoose';

export const sectorTemperatureSchema = new Schema({
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
