module.exports = function createError(message, statusCode) {
  return Object.assign(new Error(), {
    statusCode,
    message: { error: message },
  })
}
