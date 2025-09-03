import mongoose, { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buyer","freelancer","admin"], default: "buyer" },
  skills: [{ type: String }],
  bio: { type: String, default: "" },
  wallet: { type: Number, default: 0 }
}, { timestamps: true });

export type User = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model<User>("User", UserSchema);
