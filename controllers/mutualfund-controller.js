import MutualFund from "../models/mutualfund-model.js";

export const saveFund = async (req, res) => {
  try {
    const { schemeCode, schemeName, userId } = req.body;

    if (!schemeCode || !schemeName || !userId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existing = await MutualFund.findOne({ schemeCode, userId });
    if (existing) {
      return res.status(409).json({ message: "Mutual fund already saved." });
    }

    const fund = new MutualFund({ schemeCode, schemeName, userId });
    await fund.save();

    res.status(201).json({ message: "Mutual fund saved successfully.", fund });
  } catch (error) {
    console.error("Save fund error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getFundsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const funds = await MutualFund.find({ userId });

    res.status(200).json({ userId, funds });
  } catch (error) {
    console.error("Get funds error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
