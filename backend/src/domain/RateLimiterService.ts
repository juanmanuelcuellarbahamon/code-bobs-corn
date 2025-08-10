import { PurchaseRepository } from "./PurchaseRepository";

export class RateLimiterService {
  constructor(private purchaseRepo: PurchaseRepository) {}

  canPurchase(clientId: string, cornId: number): boolean {
    const lastPurchase = this.purchaseRepo.getLastPurchase(clientId, cornId);
    if (!lastPurchase) return true;
    const now = Date.now();
    const diff = now - lastPurchase.timestamp.getTime();
    return diff > 60 * 1000;
  }
}
