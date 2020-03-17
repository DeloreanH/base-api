import { Schema } from 'mongoose';

export const textureSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
