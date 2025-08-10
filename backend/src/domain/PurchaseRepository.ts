import { CornPurchase } from "./CornPurchase";

export interface PurchaseRepository {
  getLastPurchase(clientId: string, cornId?: number): CornPurchase | null;
  savePurchase(purchase: CornPurchase): void;
  getCount(clientId: string, cornId?: number): number;
}