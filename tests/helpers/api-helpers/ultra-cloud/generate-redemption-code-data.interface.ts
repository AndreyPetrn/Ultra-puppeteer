export interface IGenerateRedemptionCodeData {
  codeType: string;
  quantity?: number;
  customCodeInfo?: any;
  codeState?: RedemptionCodeState;
}

export enum RedemptionCodeState {
  Available = 'Available',
  Inactive = 'Inactive',
}
