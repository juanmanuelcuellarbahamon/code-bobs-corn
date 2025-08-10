import { PurchaseRepository } from "../../domain/PurchaseRepository";
import { CornPurchase } from "../../domain/CornPurchase";

type ClientData = {
  lastPurchase: Record<number, CornPurchase>;
  counts: Record<number, number>;
};

export class InMemoryPurchaseRepo implements PurchaseRepository {
  private store = new Map<string, ClientData>();

  getLastPurchase(clientId: string, cornId: number): CornPurchase | null {
    const data = this.store.get(clientId);
    return data?.lastPurchase?.[cornId] ?? null;
  }

  savePurchase(purchase: CornPurchase): void {
    const data = this.store.get(purchase.clientId) ?? { lastPurchase: {}, counts: {} };
  
    data.lastPurchase = data.lastPurchase ?? {};
    data.counts = data.counts ?? {};
    data.lastPurchase[purchase.cornId] = purchase;
    data.counts[purchase.cornId] = (data.counts[purchase.cornId] ?? 0) + 1;

    this.store.set(purchase.clientId, data);
  }
  

  getCount(clientId: string, cornId?: number): number {
    const counts = this.store.get(clientId)?.counts ?? {};
    return cornId !== undefined
      ? (counts[cornId] ?? 0)
      : Object.values(counts).reduce((a, b) => a + b, 0);
  }
}
