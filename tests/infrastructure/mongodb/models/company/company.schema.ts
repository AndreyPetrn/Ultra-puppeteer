import { BLOCKCHAIN_STATUS_TYPES } from '../users.constant';
import { BlockSchema } from '../user/block.schema';
import { CompanyUserRoleValues } from './company-user.model';
import { Schema } from 'mongoose';
import { UniqueCompanyUserValidator } from './company-users.validation';

export const AddressSchema = new Schema({
    streetName: {
        type: String,
        required: true,
    },
    streetName2: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export const CompanyUserSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: CompanyUserRoleValues,
    },
});

export const CompanySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        blockchainId: {
            type: String,
            unique: true,
            sparse: true,
            required: true,
        },
        blocks: [BlockSchema],
        transactionId: String,
        blockchainStatus: {
            type: String,
            enum: BLOCKCHAIN_STATUS_TYPES,
        },
        primaryContactId: {
            type: String,
            required: true,
        },
        secondaryContactId: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: AddressSchema,
            required: true,
        },
        users: {
            type: [CompanyUserSchema],
            validator: UniqueCompanyUserValidator,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collation: {
            locale: 'en',
            strength: 1,
        },
    }
);
