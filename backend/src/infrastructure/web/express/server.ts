import express from "express";
import cors from "cors";
import { InMemoryPurchaseRepo } from "../../repositories/InMemoryPurchaseRepo";
import { RateLimiterService } from "../../../domain/RateLimiterService";
import { BuyCornUseCase } from "../../../application/BuyCornUseCase";
import { GetPurchaseCountUseCase } from "../../../application/GetPurchaseCountUseCase";
import { createRoutes } from "./routes";

export const startServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: "http://127.0.0.1:8080",
    credentials: true,
  }));

  const repo = new InMemoryPurchaseRepo();
  const rateLimiter = new RateLimiterService(repo);
  const buyUseCase = new BuyCornUseCase(rateLimiter, repo);
  const getCountUseCase = new GetPurchaseCountUseCase(repo);

  app.use("/", createRoutes(buyUseCase, getCountUseCase));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`backend running http://localhost:${PORT}`));
}
