const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require('cors')

const { port, user, pwd } = require("./helpers/config");
//---------------------------------------------
const userRoute = require("./routes/user_route");
const adminRoute = require("./routes/admin_route")
const path = require("path");
//-------------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes---------
app.use("/user", userRoute);  
// app.use('/admin',adminRoute);
// Admin Panel -------------------------------------------------------------------------------------------------               -----------------------------------------------
app.use("/", express.static(path.join(__dirname, 'dist','website')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist', 'website', 'index.html'))
  })

  // app.get('/',(req,res)=>{
  //   res.json({response : "HI Its working"});
  // })
//----------------------------------------------------URLS (MONGO-DB CONNECTION)----------------------------------------------------------------------------------------------------
// const url = "mongodb://127.0.0.1:27017/Super";
const url = `mongodb+srv://superUserAdmin:ByMPC6MynSCcMDQU@cluster0.q1eo1di.mongodb.net/Super`;

//..........----------------------------------------------.....................----------------------................................................................................

let mongoClientConstructor = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, mongoClientConstructor, (err) => {
  if (err) {
    console.log("Error is : " + err);
  } else {
    console.log("MongoDb is successfully connected");
  }
});

app.listen(port, () => {
  console.log(`Server is connected at port....${port}`);
});
