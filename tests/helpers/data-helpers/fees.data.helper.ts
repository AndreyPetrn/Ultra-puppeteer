import { Decimal } from 'decimal.js';

export class FeesDataHelper {
  static async calculateFees (price: any, ratio: Decimal = new Decimal(0.025), share: Decimal = new Decimal(0.1)): Promise<any> {
    const priceDecimal = new Decimal(price);
    const platformFee = parseFloat(ratio.mul(priceDecimal).toFixed(8, Decimal.ROUND_DOWN));
    const creatorsShare = parseFloat(share.mul(priceDecimal).toFixed(8, Decimal.ROUND_DOWN));
    const earnAmount = parseFloat(priceDecimal.minus(platformFee).minus(creatorsShare).toFixed(8, Decimal.ROUND_CEIL));
    const fees = {
      platformFee: platformFee.toString(),
      creatorsShare: creatorsShare.toString(),
      totalAmount: earnAmount.toString()
    }
    return fees;
  }

  static async generateRandomPrice (max: number): Promise<number> {
    return Math.floor(Math.random() * max);
  }
}
