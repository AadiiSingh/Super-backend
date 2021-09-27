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
        if (data.email) {
            let userDetails = await userModel.find({ email: data.email }).lean();
            if (userDetails.length != 0) {
                let checkPass = await userModel.find({ password: md5(data.password) }).lean();
                if (checkPass.length !=  0) {
                    let token = jwt.sign({
                        id: checkPass._id
                    }, config.secret)
                    let saveLoginToken = await userModel.findOneAndUpdate({ password: md5(data.password) }, { $set: { token: token } },{new :true});
                    return {
                        response: saveLoginToken,
                        message: "Login Success"
                    };
                } throw Error("Invalid Password");
            } throw Error("User Doen Not Exist");
        }  throw Error("Invalid Creds");         
    } catch (e) {
        return {error: e.message}

    }
};