import { PurchaseRepository } from "../domain/PurchaseRepository";

export class GetPurchaseCountUseCase {
  constructor(private repo: PurchaseRepository) {}

  execute(clientId: string, cornId: number) {
    const count = this.repo.getCount(clientId, cornId);
    return { count };
  }
}
