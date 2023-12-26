'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentStatus = exports.ProductType = exports.PaymentType = exports.BlockchainStatus = exports.BlockStatus = exports.OsType = exports.BranchType = void 0;
let BranchType;
(function (BranchType) {
    BranchType['MASTER'] = 'master';
    BranchType['DEV'] = 'dev';
    BranchType['BETA'] = 'beta';
    BranchType['NONE'] = 'none';
})(BranchType = exports.BranchType || (exports.BranchType = {}));
let OsType;
(function (OsType) {
    OsType['WIN'] = 'win';
    OsType['LINUX'] = 'linux';
    OsType['MAC'] = 'mac';
    OsType['CROSS'] = 'cross';
})(OsType = exports.OsType || (exports.OsType = {}));
let BlockStatus;
(function (BlockStatus) {
    BlockStatus['ACCEPTED'] = 'accepted';
    BlockStatus['CANCELLED'] = 'cancelled';
    BlockStatus['IRREVERSIBLE'] = 'irreversible';
})(BlockStatus = exports.BlockStatus || (exports.BlockStatus = {}));
let BlockchainStatus;
(function (BlockchainStatus) {
    BlockchainStatus['PENDING'] = 'pending';
    BlockchainStatus['FAILURE'] = 'failure';
    BlockchainStatus['SUCCESS'] = 'success';
})(BlockchainStatus = exports.BlockchainStatus || (exports.BlockchainStatus = {}));
let PaymentType;
(function (PaymentType) {
    PaymentType['PSP'] = 'PSP';
    PaymentType['BLOCKCHAIN'] = 'BLOCKCHAIN';
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
let ProductType;
(function (ProductType) {
    ProductType['GAME'] = 'Game';
    ProductType['LANGUAGE_PACK'] = 'Language_Package';
    ProductType['D_SERVER'] = 'Dedicated_Server';
    ProductType['DEMO'] = 'Demo';
    ProductType['DLC'] = 'DLC';
})(ProductType = exports.ProductType || (exports.ProductType = {}));
let PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus['ACCEPTED'] = 'accepted';
    PaymentStatus['SUCCEEDED'] = 'succeeded';
    PaymentStatus['FAILED'] = 'failed';
    PaymentStatus['INCONSISTENT'] = 'inconsistent';
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
