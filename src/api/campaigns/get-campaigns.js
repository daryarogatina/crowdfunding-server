const { sendSuccessResponseWithData, sendErrorResponse } = require("../../helpers/response");


const getCampaigns = async (req, res, db) => {
  try {
    const result = await db.query(
      `SELECT * FROM campaigns WHERE status = 'active'`
    );
    return sendSuccessResponseWithData(res, 200, result);
  } catch (error) {
    db.closeConnection();
    sendErrorResponse(res, 500, "Internal Server Error");
    throw error;
  }
};

module.exports = { getCampaigns };
