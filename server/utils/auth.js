const jwt  = require('jsonwebtoken');
module.exports.createTokens = (user) => {
    const refresh_token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
   
      const access_token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "15min" }
      ); 
      return {
        access_token: access_token,
        refresh_token: refresh_token,
        userId: user._id.toString(),
      };
}