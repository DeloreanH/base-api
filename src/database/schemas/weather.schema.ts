import { Schema } from 'mongoose';

export const weatherSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
