'use strict';
let __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
let __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function(o, v) {
    o['default'] = v;
});
let __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    let result = {};
    if (mod != null) for (let k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.findUserByEmail = void 0;
const mongoose = __importStar(require('mongoose'));
const dotenv = __importStar(require('dotenv'));
const user_schema_1 = require('./models/user/user.schema');
dotenv.config({ path: require('path').join(__dirname, '../../.env') });
function findUserByEmail(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersDB = yield mongoose.createConnection(process.env.dbHost, {
                useNewUrlParser: true,
                user: process.env.dbUser,
                pass: process.env.dbPassword,
                dbName: 'user-data',
            });
            console.log('--> Connected to user DB');
            const usersModel = usersDB.model('users', user_schema_1.UserSchema);
            let user;
            try {
                user = yield usersModel.findOne({ 'personalData.email': userEmail });
                console.log('Order fetched');
            }
            catch (err) {
                console.log('Order was not fetched');
                console.log(JSON.stringify(err.message));
            }
            usersDB.close();
            console.log('<-- Connection to db closed');
            return user;
        }
        catch (err) {
            console.log('<-XXX-> Connection to db failed');
            console.log(JSON.stringify(err.message));
        }
    });
}
exports.findUserByEmail = findUserByEmail;
// export async function validateBlockchain(userBlockchainId: string) {
//   try {
//     const usersDB = await mongoose.createConnection(process.env.dbHost, {
//       useNewUrlParser: true,
//       user: process.env.dbUser,
//       pass: process.env.dbPassword,
//       dbName: 'user-data',
//     });
//     console.log('--> Connected to user DB');
//
//     const usersModel = usersDB.model('users', UserSchema);
//
//     try {
//       const filter = { blockchainId: userBlockchainId };
//       const update = { blockchainStatus: 'success' };
//       await usersModel.findOneAndUpdate(filter, update, { new: true });
//       console.log('Blockchain validated');
//     } catch (err) {
//       console.log('Blockchain was not validated');
//       console.log(JSON.stringify(err.message));
//     }
//     usersDB.close();
//     console.log('<-- Connection to user-data closed');
//   } catch (err) {
//     console.log('<-XXX-> Connection to user-data failed');
//     console.log(JSON.stringify(err.message));
//   }
// }
//
// export async function changeUserCountry(userEmail: string, country: string) {
//   try {
//     const usersDB = await mongoose.createConnection(process.env.dbHost, {
//       useNewUrlParser: true,
//       user: process.env.dbUser,
//       pass: process.env.dbPassword,
//       dbName: 'user-data',
//     });
//     console.log('--> Connected to user DB');
//
//     const usersModel = usersDB.model('users', UserSchema);
//
//     try {
//       const filter = { 'personalData.email': userEmail };
//       const update = { $set: { 'personalData.addresses.0.detail.country': country } };
//       await usersModel.findOneAndUpdate(filter, update, { new: true });
//       console.log('Country updated');
//     } catch (err) {
//       console.log('Country was not updated');
//       console.log(JSON.stringify(err.message));
//     }
//     usersDB.close();
//     console.log('<-- Connection to user-data closed');
//   } catch (err) {
//     console.log('<-XXX-> Connection to user-data failed');
//     console.log(JSON.stringify(err.message));
//   }
// }
