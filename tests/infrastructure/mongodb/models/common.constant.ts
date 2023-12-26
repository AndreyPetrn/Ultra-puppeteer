export enum BlockStatus {
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  IRREVERSIBLE = 'irreversible',
}

export declare const BLOCK_STATUS_TYPES: Array<BlockStatus>;

export enum BlockchainStatus {
  PENDING = 'pending',
  FAILURE = 'failure',
  SUCCESS = 'success',
}
