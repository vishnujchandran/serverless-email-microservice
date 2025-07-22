import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import apiHandler from "./api";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api", async (req, res) => {
  const vercelReq: VercelRequest = req as unknown as VercelRequest;
  const vercelRes: VercelResponse = res as unknown as VercelResponse;

  await apiHandler(vercelReq, vercelRes);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api`);
});
