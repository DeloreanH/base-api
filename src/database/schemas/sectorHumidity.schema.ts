import { Schema } from 'mongoose';

export const sectorHumiditySchema = new Schema({
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
