import { Game } from './game.model';
import { Schema } from 'mongoose';
import { OrderSchema } from '../user/user.schema';

export const GameSchema: Schema<Game> = new Schema<Game>(
  {
    gameId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    ultraCloudId: {
      type: String,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

export const LibraryItemSchema = new Schema({
  _id: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true
  },
  userOnChainId: {
    type: String,
    required: true
  },
  tokenFactoryId: {
    type: String,
    required: true,
    index: true
  },
  order: { type: OrderSchema, default: null, required: false },
});

export const GameUniqsSchema = new Schema({
  _id: {
    type: String,
    required: true,
    index: true
  },
  userOnChainId: {
    type: String,
    required: true
  },
  uniqFactoryOnChainId: {
    type: Number,
    required: true,
  },
  uniqOnChainId: {
    type: Number,
    required: true
  }
});
