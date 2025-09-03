import mongoose, { Schema, InferSchemaType } from "mongoose";

const ProposalSchema = new Schema({
  freelancer: { type: Schema.Types.ObjectId, ref: "User" },
  coverLetter: { type: String },
  bidAmount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const JobSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true, min: 1 },
    category: { type: String, default: "General" },
    skillsRequired: [{ type: String }],
    status: { type: String, enum: ["open","in_progress","completed","cancelled"], default: "open" },
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedFreelancer: { type: Schema.Types.ObjectId, ref: "User", default: null },
    proposals: [ProposalSchema],
    deadline: { type: Date, default: null }
  },
  { timestamps: true }
);

export type Job = InferSchemaType<typeof JobSchema>;
export const JobModel = mongoose.model<Job>("Job", JobSchema);
