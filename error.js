function errorHandle(error, response, next) {
  if (error) {
    response.status(500).send(error.message);
  } else {
    next(error);
  }
}

module.exports = errorHandle;