import { Schema } from 'mongoose';
import { BLOCKCHAIN_STATUS_TYPES } from '../users.constant';
import { BlockSchema } from './block.schema';

export const DeviceSchema = new Schema({
    deviceId: {
        type: String,
        required: true,
    },
    ultraHalfVaultKey: {
        type: String,
        required: true,
    },
});

export const AddressSchema = new Schema({
    streetName: {
        type: String,
        required: false,
    },
    streetName2: String,
    state: String,
    zipCode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    isPrimary: {
        type: Boolean,
        default: true,
    },
    city: {
        type: String,
    },
});

export const AddressElementSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    detail: {
        type: AddressSchema,
        required: true,
    },
});

export const PhoneElementSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export const PersonalSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phones: [PhoneElementSchema],
    addresses: [AddressElementSchema],
    countryCode: String,
    countryCurrency: String,
});

export const ProfessionalSchema = new Schema({
    companyId: {
        type: String,
        required: true,
        index: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export const OrderSchema = new Schema({
    _id: {
        type: String,
        required: true,
        index: true,
    },
    status: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    date: {
        type: Date,
    },
});

export const TokenDetailSchema = new Schema({
    tokenFactoryId: {
        type: String,
        required: true,
    },
    order: { type: OrderSchema, default: null, required: false },
});

// noinspection TypeScriptValidateTypes
export const UserSchema = new Schema(
    {
        blockchainId: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        blockchainStatus: {
            type: String,
            enum: BLOCKCHAIN_STATUS_TYPES,
        },
        blockchainKeys: {
            publicOwnerKey: String,
            publicActiveKey: String,
        },
        blocks: [BlockSchema],
        transactionId: String,
        braincloudId: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        roles: [String],
        walletAmount: {
            type: Number,
            default: 10000,
        },
        personalData: PersonalSchema,
        professionalData: [ProfessionalSchema],
        tokens: {
            type: [TokenDetailSchema],
            default: [],
        },
        devices: {
            type: [DeviceSchema],
            default: [],
        },
        activeDeviceId: String,
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
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
