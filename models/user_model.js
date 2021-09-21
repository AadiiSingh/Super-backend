const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        mobile: {
            type: Number
        },
        address: {
            type: String
        },
        token: {
            type: String
        },
        roleId: {
            type: Number         // 2 for user .... 1 for admin
        },
        password: {
            type: String
        }
    }, {
    versionKey: false,
    timestamps: false,
}

);

exports.userModel = mongoose.model('users', userSchema);
