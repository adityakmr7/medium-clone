const User = require("../../models/User");
const { createTokens } = require("../../utils/auth");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Profile = require("../../models/Profile");


const loginUser = async (parent, { email, password }, { res }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error("User Not Found");
        error.code = 401;
        throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        const error = new Error("Wrong Password");
        error.code = 401;
        throw error;
    }

    const { access_token, refresh_token } = createTokens(user);
    res.cookie("refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    res.cookie("access_token", access_token, { maxAge: 60 * 15 * 1000 });
    return {
        access_token: access_token,
        refresh_token: refresh_token,
        userId: user._id.toString(),
    };
};


const registerUser = async (parent, { userInput }) => {
    const { email, username, password } = userInput;
    const errors = [];
    if (!validator.isEmail(email)) {
        errors.push({
            message: "Invalid Email",
        });
    }
    // if (
    //   validator.isEmpty(password) ||
    //   validator.isLength(password, { min: 5 })
    // ) {
    //   errors.push({
    //     message: "Enter a Valid Password",
    //   });
    // }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        const error = new Error("User exists already");
        throw error;
    }
    if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = 402;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        email: email,
        password: hashedPassword,
        username: username,
    });

    const createdUser = await user.save();
  
    const profile = new Profile();
    profile.username = createdUser.username;
    profile.user = createdUser._id;
    await profile.save();
    return {
        ...createdUser._doc,
        ...profile._doc,
        _id: createdUser._id.toString(),
    };
};
module.exports = {loginUser, registerUser}