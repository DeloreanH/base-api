import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const sectorTemperatureSchema = new Schema({
    monthId: {
        type: Schema.Types.ObjectId,
        ref: modelName.MONTH,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
    average: {
        type: Number,
    },
});
