"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_model_1 = require("./job.model");
const user_model_1 = require("../users/user.model");
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
// seed
async function ensureSeed() {
    const count = await job_model_1.JobModel.countDocuments();
    if (count === 0) {
        // create a fake buyer first
        let buyer = await user_model_1.UserModel.findOne({ email: "buyer1@example.com" });
        if (!buyer) {
            buyer = await user_model_1.UserModel.create({ name: "Buyer One", email: "buyer1@example.com", password: "", role: "buyer" });
        }
        await job_model_1.JobModel.insertMany([
            { title: "Landing page design", description: "Responsive landing page.", budget: 150, buyer: buyer._id },
            { title: "React admin dashboard", description: "Admin panels, charts & auth.", budget: 400, buyer: buyer._id },
            { title: "Node API hardening", description: "Security + rate limit + validation.", budget: 250, buyer: buyer._id }
        ]);
    }
}
// GET /api/jobs
router.get("/", async (req, res) => {
    await ensureSeed();
    const jobs = await job_model_1.JobModel.find().populate("buyer assignedFreelancer", "-password").sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: jobs });
});
// GET single job
router.get("/:id", async (req, res) => {
    try {
        const job = await job_model_1.JobModel.findById(req.params.id).populate("buyer assignedFreelancer proposals.freelancer", "-password");
        if (!job)
            return res.status(404).json({ ok: false, message: "Not found" });
        res.json({ ok: true, data: job });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
// POST create job (buyer)
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        if (!data.buyer)
            return res.status(400).json({ ok: false, message: "buyer id required" });
        const job = await job_model_1.JobModel.create(data);
        res.status(201).json({ ok: true, data: job });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
// POST submit proposal
router.post("/:id/proposals", async (req, res) => {
    try {
        const { freelancer, coverLetter, bidAmount } = req.body;
        const job = await job_model_1.JobModel.findById(req.params.id);
        if (!job)
            return res.status(404).json({ ok: false, message: "Job not found" });
        job.proposals.push({ freelancer: mongoose_1.Types.ObjectId(freelancer), coverLetter, bidAmount });
        await job.save();
        res.status(201).json({ ok: true, data: job });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
// POST assign freelancer (buyer)
router.post("/:id/assign", async (req, res) => {
    try {
        const { freelancerId } = req.body;
        const job = await job_model_1.JobModel.findByIdAndUpdate(req.params.id, { assignedFreelancer: mongoose_1.Types.ObjectId(freelancerId), status: "in_progress" }, { new: true }).populate("assignedFreelancer", "-password");
        if (!job)
            return res.status(404).json({ ok: false, message: "Job not found" });
        res.json({ ok: true, data: job });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
// POST complete
router.post("/:id/complete", async (req, res) => {
    try {
        const job = await job_model_1.JobModel.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
        if (!job)
            return res.status(404).json({ ok: false, message: "Job not found" });
        res.json({ ok: true, data: job });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
exports.default = router;
