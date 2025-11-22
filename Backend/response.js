export function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

export function error(res, message = "Something went wrong", statusCode = 400) {
  return res.status(statusCode).json({ success: false, message });
}
