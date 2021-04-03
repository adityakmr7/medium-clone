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

module.exports = {updateUserProfile}