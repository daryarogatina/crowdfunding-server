require("dotenv").config();
const http = require("http");
const db = require("./src/services/db");
const api = require("./src/api/index");
const { sendErrorResponse, sendOptions } = require("./src/helpers/response");

const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/campaigns") {
      api.getCampaigns(req, res, db);
    } else {
      sendErrorResponse(res, 404, "Not Found");
    }
  } else if (req.method === "POST") {
    if (req.url === "/donations") {
      api.addDonation(req, res, db);
    } else if (req.url === "/donations/fraud/mark") {
      api.markDonationAsFraud(req, res, db);
    } else {
      sendErrorResponse(res, 404, "Not Found");
    }
  } else if (req.method === "OPTIONS") {
    sendOptions(res, 200);
    return;
  } else {
    sendErrorResponse(res, 404, "Not Found");
  }
});

server.listen(process.env.NODE_PORT, process.env.NODE_HOST, () => {
  console.log(
    `Server is running on http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/`
  );
});
