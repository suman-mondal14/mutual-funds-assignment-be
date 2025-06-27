import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema(
  {
    schemeCode: {
      type: Number,
      required: true,
    },
    schemeName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MutualFund = mongoose.model("MutualFund", mutualFundSchema);

export default MutualFund;
