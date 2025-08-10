import { Router } from "express";
import { BuyCornUseCase } from "../../../application/BuyCornUseCase";
import { GetPurchaseCountUseCase } from "../../../application/GetPurchaseCountUseCase";
import { clientIdMiddleware } from "./middleware/clientId";

export const createRoutes = (
  buyUseCase: BuyCornUseCase,
  getCountUseCase: GetPurchaseCountUseCase
) => {
  const router = Router();

  router.post("/buy-corn/:cornId", clientIdMiddleware, (req, res) => {
    const clientId = (req as any).clientId || req.ip;
    const cornId = Number(req.params.cornId);
    const cornName = req.body.cornName;

    const result = buyUseCase.execute(clientId, cornId, cornName);

    if (!result.success) {
      return res.status(result.status).json({ error: result.message });
    }

    return res.status(200).json({
      message: result.message,
      count: result.count,
    });
  });

  router.get("/me/purchases/:cornId", clientIdMiddleware, (req, res) => {
    const clientId = (req as any).clientId || req.ip;
    const cornId = Number(req.params.cornId);

    if (Number.isNaN(cornId)) {
      return res.status(400).json({ error: "cornId must be a valid number" });
    }

    const result = getCountUseCase.execute(clientId, cornId);

    return res.json({
      clientId,
      cornId,
      purchases: result.count,
    });
  });

  return router;
};
