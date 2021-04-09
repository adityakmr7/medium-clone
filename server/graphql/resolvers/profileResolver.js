const jwt = require("jsonwebtoken");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const updateUserProfile = async (parent, { profileInput }, { req }) => {
    
    const { firstName,
        lastName,
        bio,
        profilePic,
        username,
        url } = profileInput;
  
    const accessToken = req.cookies['access_token'];
    const userValue = jwt.decode(accessToken);
    const userId = userValue.userId;


    const getProfile = await Profile.findOne({ 'user': userId });
  
    let profileUpdated;
    if (getProfile) {
        getProfile.firstName = firstName;
        getProfile.lastName = lastName;
        getProfile.bio = bio;
        getProfile.profilePic = profilePic;
        getProfile.username = username !== "" ? username : getProfile.username;
        getProfile.url = url;
        profileUpdated = await getProfile.save();
    }

    const user = await User.findById(userId);

    user.username = profileUpdated.username;
    // user.profile = profileUpdated._id
    await user.save();
    return {
        ...profileUpdated._doc,
        _id: profileUpdated._id.toString(),
        createdAt: profileUpdated.createdAt.toString(),
        updatedAt: profileUpdated.updatedAt.toString(),
    };
  
};

const getUserProfile = async (parent, _, { req }) => {
    if (!req.userId || !req.isAuth) {
        const error = new Error('Not Authenticated');
        error.code = 401;
        throw error;
    }
    const profile = await Profile.findOne({ user: req.userId });
    return {
        ...profile._doc,
        _id: profile._id.toString(),
        createdAt:profile.createdAt.toString(),
        updatedAt: profile.updatedAt.toString(),
    }
  
} 
module.exports = {updateUserProfile,getUserProfile}