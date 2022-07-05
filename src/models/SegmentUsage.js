import mongoose from "mongoose";
const SegmentUsageSchema = new mongoose.Schema(
  {
    SegmentID: { type: String },
    RequirementDesignator: { type: String },
    MaximumLoopRepeat: { type: String },
    Section: { type: String },
    Agency: { type: String },
    MaximumUsage: { type: String },
    Version: { type: String },
    BeginEnd: { type: String },
    TransactionSetID: { type: String },
    Release: { type: String },
    Position: { type: String },
    LoopID: { type: String },
    RequiredFirstSegment: { type: String },
  },
  {
    collection: "SegmentUsage",
  }
);

const SegmentUsage = mongoose.model("SegmentUsage", SegmentUsageSchema);

export { SegmentUsage };
