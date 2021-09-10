const express = require("express");
const route = express.Router();
const { verifyToken } = require("../middleware/jwt");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
var jwt = require('../middleware/jwt');

const user_controller = require("../controller/user_controller")


route.post('/user_signup', jwt.verifyToken, user_controller.signup);











module.exports = route;