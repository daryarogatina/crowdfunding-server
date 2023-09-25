const setHeaders = (res, statusCode) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  });
};

const sendErrorResponse = (res, statusCode, errorMessage) => {
  setHeaders(res, statusCode);
  res.end(JSON.stringify({ error: errorMessage }));
};

const sendSuccessResponse = (res, statusCode, message) => {
  setHeaders(res, statusCode);
  res.end(JSON.stringify({ message }));
};

const sendSuccessResponseWithData = (res, statusCode, data) => {
  setHeaders(res, statusCode);
  res.end(JSON.stringify(data));
};

const sendOptions = (res) => {
  setHeaders(res, 200);
  res.end();
};

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
  sendSuccessResponseWithData,
  sendOptions,
};
