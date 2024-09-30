const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  const userWithSameUsername = await User.findOne({
    username: userData.userName,
  });
  const userWithSameEmail = await User.findOne({ email: userData.email });

  if (userWithSameUsername || userWithSameEmail) {
    throw new Error("User already exists with the same username or email");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = new User({
    ...userData,
    password: hashedPassword,
  });

  await user.save();
  const token = generateToken({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  });

  return {
    username: user.username,
    name: user.name,
    email: user.email,
    token,
  };
};

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
module.exports = createUser;
