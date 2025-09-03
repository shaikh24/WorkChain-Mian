import { Router } from "express";
const router = Router();

// placeholder for order/escrow flows
router.post("/", async (req, res) => {
  res.json({ ok:true, message: "Order flow placeholder. Integrate payment provider here." });
});

export default router;
