const user_business = require("../business/user_business");
const jwt = require("jsonwebtoken");
const config = require("../helpers/config");

exports.signup = async (req, res) => {
    try {
        let r = await user_business.registerUser(req);
        res.status(200).send(r);
    } catch (err) {
        console.log("Error is : " + err);
        res.status(400).send(err);
    }
};

exports.user_signIn = async (req, res) => {
    try {
        let r = await user_business.user_signIn(req.body);
        res.status(200).send(r);
    } catch (err) {
        console.log("Error is : " + err);
        res.status(400).send(err);
    }
};

exports.update = async(req,res)=>{
    res.status(200).json({
        Response:"this is update"
    })
}
