const { getCampaigns } = require("./campaigns/get-campaigns");
const { addDonation } = require("./donations/add-donation");
const { markDonationAsFraud } = require("./donations/mark-donation-as-fraud");

module.exports = {
  getCampaigns,
  addDonation,
  markDonationAsFraud,
};
