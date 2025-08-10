import { PurchaseRepository } from "../domain/PurchaseRepository";
import { CornPurchase } from "../domain/CornPurchase";
import { RateLimiterService } from "../domain/RateLimiterService";

export class BuyCornUseCase {
  constructor(
    private rateLimiter: RateLimiterService,
    private purchaseRepo: PurchaseRepository
  ) {}

  execute(clientId: string, cornId: number, cornName: string) {
    if (!this.rateLimiter.canPurchase(clientId, cornId)) {
      return { success: false, status: 429, message: "Too many purchases, slow down!" };
    }

    const purchase: CornPurchase = {
      clientId,
      cornId,
      cornName,
      timestamp: new Date(),
    };
    
    this.purchaseRepo.savePurchase(purchase);

    return {
      success: true,
      status: 200,
      message: `Successfully bought ${cornName} corn!`,
      count: this.purchaseRepo.getCount(clientId, cornId)
    };
  }
}
