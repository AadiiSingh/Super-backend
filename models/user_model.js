const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email_address: {
            type: String
        },
        mobile_number: {
            type: Number
        },
        address: {
            type: String
        },
    },{
        versionKey: false,
        timestamps: false,
    }

);

exports.userModel = mongoose.model('users', userSchema);
