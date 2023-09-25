// It's better to use some libraries (e.g. joi or validator) to check this fields.
function validateDonation(request) {
  const errors = [];
  if (!request.campaign_id || typeof request.campaign_id !== "string") {
    errors.push("Campaign ID is required");
  }
  if (!request.amount || isNaN(request.amount)) {
    errors.push("Amount is required");
  }
  if (
    !request.donator_nickname ||
    request.donator_nickname.length > 100 ||
    typeof request.donator_nickname !== "string"
  ) {
    errors.push("Nickname is required");
  }

  if (errors.length) {
    return errors;
  }
  return null;
}

function validateMarkAsFraud(request) {
    const errors = [];
    if (
      !request.nickname ||
      request.nickname.length > 100 ||
      typeof request.nickname !== "string"
    ) {
      errors.push("Nickname is required");
    }
  
    if (errors.length) {
      return errors;
    }
    return null;
  }

module.exports = {
  validateDonation,
  validateMarkAsFraud,
};
