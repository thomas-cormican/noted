const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token;
  try {
    token = await req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken.user;
    next();
  } catch (err) {
    const error = new Error("Cannot verify token");
    error.status = 401;
    return next(error);
  }
};
