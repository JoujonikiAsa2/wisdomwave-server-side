const jwt = require("jsonwebtoken");
require("dotenv").config();

// token middleware function


exports.VerifyStudent = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(req.body, 'token middleware');
  console.log('value of token in middlewares', token);

  if (!token) {
    return res.status(401).send({ message: 'unauthorized' ,});
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: err });
      }
      else if (decoded.userType === 'student') {
        next();
      }
      else {
        return res.status(401).send({ message: 'unauthorized' });
      }

      req.user = decoded;
      console.log("Token Value", req.user.userType, decoded);

    });
  } catch (error) {
    console.log("Invalid Token", error);
    return res.status(401).send({ message: 'unauthorized' });
  }
};


