const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  }); // Generate token after successful authentication

  return {
    username: user.username,
    name: user.name,
    email: user.email,
    token,
  };
};

module.exports = authenticateUser;
