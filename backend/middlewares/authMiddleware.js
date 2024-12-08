const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //check for the presence of the authorization header
  const token = req.headers.authorization?.split(" ")[1];
  //if no token is found, send an unauthorized response
  if (!token)
    return res.status(401).json({ message: "Access denied , token missing" });

  try {
    //verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //attach the decoded user data to the request object
    req.user = decoded;
    //proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
