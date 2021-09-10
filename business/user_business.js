const config = require("../helpers/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.registerUser = async (req) => {
    let data = req.body;
    data.roleId = 2;
    // 2 for user .... 1 for admin

    let { longitude, latitude } = req.body;
    longitude = longitude ? longitude : 77.391;
    latitude = latitude ? latitude : 28.5355;
    req.body.location = { type: "Point", coordinates: [longitude, latitude] };

    data.mobile = parseInt(data.mobile);
    data.isMobileVerified = false;
    if (
        !data.countryCode ||
        data.countryCode == null ||
        data.countryCode == "NA" ||
        data.countryCode == undefined
    )
        throw { message: msg.mobileNumAndCountryCodeRequire };
    if (!data.firstname || !data.lastname)
        throw { message: msg.firstnameAndlastnameRequire };

    if (!data.email) throw { message: msg.emailisRequire };

    //check if given number is already exist
    let isMobileExist = await users.findOne({ mobile: data.mobile }).lean();
    if (isMobileExist) throw { message: msg.mobileAlreadyExist };

    let isEmailExist = await users.findOne({ email: data.email }).lean();
    if (isEmailExist) throw { message: msg.emailAlreadyExist };

    // if (data.confirmPassword === data.password) {
    //   let pass = await bcrypt.hash(req.body.password, 10);
    //   data.password = pass;
    // } else {
    //   throw { message: msg.fieldNotMatch };
    // }
    let res = new users(data);
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
    let saveToken = await users.findOneAndUpdate(
        { mobile: data.mobile, countryCode: data.countryCode },
        { $set: { token: token } },
        { new: true }
    );
    let aa = await sendOtpDuringRegistration(data.mobile, data.countryCode);
    return {
        response: result,
        message: msg.registrationSuccessfullAndOtpSentOnMobile,
    };
};