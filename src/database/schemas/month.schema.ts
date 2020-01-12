import { Schema } from 'mongoose';

export const monthSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    numValue: {
        type: Number,
    },
}, {timestamps: true});
