const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const jwToken = req.headers.authorization;
    const user = jwt.verify(jwToken, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "You are not LoggedIn.",
    });
  }
};

module.exports = isLoggedIn;
