import * as mongoose from 'mongoose';
import { BLOCK_STATUS_TYPES } from '../common.constant';

export const BlockSchema = new mongoose.Schema({
    blockId: {
        type: String,
        required: true,
        index: true,
    },
    status: {
        type: String,
        required: true,
        enum: BLOCK_STATUS_TYPES,
    },
});
