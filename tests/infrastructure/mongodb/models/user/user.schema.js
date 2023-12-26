'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserSchema = exports.TokenDetailSchema = exports.OrderSchema = exports.ProfessionalSchema = exports.PersonalSchema = exports.PhoneElementSchema = exports.AddressElementSchema = exports.AddressSchema = exports.DeviceSchema = void 0;
const mongoose_1 = require('mongoose');
const users_constant_1 = require('../users.constant');
const block_schema_1 = require('./block.schema');
exports.DeviceSchema = new mongoose_1.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    ultraHalfVaultKey: {
        type: String,
        required: true,
    },
});
exports.AddressSchema = new mongoose_1.Schema({
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
exports.AddressElementSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    detail: {
        type: exports.AddressSchema,
        required: true,
    },
});
exports.PhoneElementSchema = new mongoose_1.Schema({
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
exports.PersonalSchema = new mongoose_1.Schema({
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
    phones: [exports.PhoneElementSchema],
    addresses: [exports.AddressElementSchema],
    countryCode: String,
    countryCurrency: String,
});
exports.ProfessionalSchema = new mongoose_1.Schema({
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
exports.OrderSchema = new mongoose_1.Schema({
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
exports.TokenDetailSchema = new mongoose_1.Schema({
    tokenFactoryId: {
        type: String,
        required: true,
    },
    order: { type: exports.OrderSchema, default: null, required: false },
});
exports.UserSchema = new mongoose_1.Schema({
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
        enum: users_constant_1.BLOCKCHAIN_STATUS_TYPES,
    },
    blockchainKeys: {
        publicOwnerKey: String,
        publicActiveKey: String,
    },
    blocks: [block_schema_1.BlockSchema],
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
    personalData: exports.PersonalSchema,
    professionalData: [exports.ProfessionalSchema],
    tokens: {
        type: [exports.TokenDetailSchema],
        default: [],
    },
    devices: {
        type: [exports.DeviceSchema],
        default: [],
    },
    activeDeviceId: String,
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
    collation: {
        locale: 'en',
        strength: 1,
    },
});
