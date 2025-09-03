"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// placeholder for order/escrow flows
router.post("/", async (req, res) => {
    res.json({ ok: true, message: "Order flow placeholder. Integrate payment provider here." });
});
exports.default = router;
