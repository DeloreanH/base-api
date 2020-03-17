import { Schema } from 'mongoose';

export const monthSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
    },
    numValue: {
        type: Number,
    },
}, {timestamps: true});
