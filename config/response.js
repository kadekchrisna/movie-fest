const response = {
  success: (status, message, data) => {
    return { status_code: status, message: message, result: data };
  },
  failed: (status, message) => {
    return { status_code: status, message: message };
  },
};
module.exports = response;
