import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    completed: {
      type: Boolean,
      default: false
    },

    dueDate: {
      type: Date
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

export const Todo =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema);
