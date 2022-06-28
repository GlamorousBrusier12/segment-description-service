function generateResponse(status, message, data = null) {
  const response = {
    status: status,
    message: message,
    data: data,
  };
  return JSON.stringify(response);
}

export { generateResponse };
