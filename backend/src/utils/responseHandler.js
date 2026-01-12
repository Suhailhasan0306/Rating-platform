const ok = (res, data = {}, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const created = (res, data = {}, message = "Created") => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

const badRequest = (res, message = "Bad Request") => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const unauthorized = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

const error = (res, message = "Something went wrong", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { ok, created, badRequest, unauthorized, error };



