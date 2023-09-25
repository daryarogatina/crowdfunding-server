const { validateDonation } = require("../../helpers/validators");
const { sendErrorResponse, sendSuccessResponse } = require("../../helpers/response");

const addDonation = async (req, res, db) => {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk;
  });
  req.on("end", async () => {
    let parsedData;
    try {
      parsedData = JSON.parse(requestBody);
    } catch {
      return sendErrorResponse(res, 400, "Bad request");
    }
    const validationErrors = validateDonation(parsedData);
    if (validationErrors) {
      return sendErrorResponse(res, 400, validationErrors);
    }

    const { campaign_id, amount, donator_nickname } = parsedData;

    try {
      await db.query(
        "INSERT INTO donations (campaign_id, amount, donator_nickname) VALUES (?, ?, ?)",
        [campaign_id, amount, donator_nickname]
      );
      return sendSuccessResponse(res, 200, "Successfully donated");
    } catch (error) {
      db.closeConnection();
      sendErrorResponse(res, 500, "Internal Server Error");
      throw error;
    }
  });
};

module.exports = { addDonation };
