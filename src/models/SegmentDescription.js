import mongoose from "mongoose";
const SegmentDescriptionSchema = new mongoose.Schema(
  {
    SegmentID: { type: String },
    Agency: { type: String },
    Version: { type: String },
    Release: { type: String },
    Description: { type: String },
  },
  {
    collection: "SegmentDescription",
  }
);

const SegmentDescription = mongoose.model(
  "SegmentDescription",
  SegmentDescriptionSchema
);

export { SegmentDescription };
