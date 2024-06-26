const jwt = require("jsonwebtoken");


exports.signInToken = async (req, res, next) => {
    try {
      const user = req.body
    //  console.log("user", user)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
      // console.log("token", token)

      res.cookie('token', token, {
          httpOnly: true,
          // secure: true,
          // sameSite: 'true'
          // httpOnly: true,
          secure: false,
        })
        .send({ success: true })
    } catch (error) {
      console.log(error);
      return res.send({ error: true, message: error.message });
    }
  };