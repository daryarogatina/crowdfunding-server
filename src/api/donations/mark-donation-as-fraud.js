const { validateMarkAsFraud } = require("../../helpers/validators");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../helpers/response");

const markDonationAsFraud = async (req, res, db) => {
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
    const validationErrors = validateMarkAsFraud(parsedData);
    if (validationErrors) {
      return sendErrorResponse(res, 400, validationErrors);
    }
    const { nickname } = parsedData;
    try {
      const result = await db.query("CALL MarkDonatorAsFraud(?)", [nickname]);
      if (!result.affectedRows)
        return sendSuccessResponse(
          res,
          200,
          "Donator with such name isn't found"
        );
      return sendSuccessResponse(res, 200, "Donator marked as fraud");
    } catch (error) {
      db.closeConnection();
      sendErrorResponse(res, 500, "Internal Server Error");
      throw error;
    }
  });
};

module.exports = { markDonationAsFraud };
