import { Schema } from 'mongoose';

export const textureSchema = new Schema({
    name: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
