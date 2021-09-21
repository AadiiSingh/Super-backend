const config = require("../helpers/config");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user_model")
const jwt = require("jsonwebtoken");
const md5 = require("md5");



exports.registerUser = async (req) => {
    let data = req.body;
    data.roleId = 2;
    // 2 for user .... 1 for admin
    //check if given number is already exist
    let isMobileExist = await userModel.findOne({ mobile: data.mobile }).lean();
    if (isMobileExist != null) throw { error: "Mobile Already Exist" };

    let isEmailExist = await userModel.findOne({ email: data.email }).lean();
    if (isEmailExist != null) throw { error: "Email Already Exist" };

    let res = new userModel(data);
    let result = await res.save();
    /**
     * if User is registered without errors
     * create a token
     */
    let token = jwt.sign(
        { id: result._id, roleId: result.roleId },
        config.secret
    );
    result["token"] = token;
    let saveToken = await userModel.findOneAndUpdate(
        { mobile: data.mobile },
        { $set: { token: token, roleId: data.roleId, password: md5(data.password) } },
        { new: true }
    );
    return result;
};

exports.user_signIn = async (data) => {
    try {
        if (data.userId) {
            let userDetails = await userModel.find({ _id: data.userId }).lean();
            return {
                response: userDetails,
                message: "Login Success"
            };
        }
    } catch (e) {
        return e.error

    }
};