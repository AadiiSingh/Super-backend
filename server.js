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
//Admin Panel -------------------------------------------------------------------------------------------------               -----------------------------------------------
// app.use("/adminpanel/", express.static(path.join(__dirname, 'dist','adminpanel')));
// 	app.get('/adminpanel/*', (req, res) => {
// 		// res.sendFile(`${__dirname}/adminpanel/index.html`);
// 		res.sendFile(path.join(__dirname, 'dist', 'adminpanel', 'index.html'))
//   })

  // app.get('/',(req,res)=>{
  //   res.send('hello web???>>>>>>>>>>>>>>>>>>');
  // })
//----------------------------------------------------URLS (MONGO-DB CONNECTION)----------------------------------------------------------------------------------------------------
let url = "mongodb://localhost:27017/Super";

//..........----------------------------------------------.....................----------------------................................................................................

let mongoClientConstructor = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, mongoClientConstructor, (err) => {
  if (err) {
    console.log("Error is : " + err);
  } else {
    console.log("MongoDb is successfully connected at....", url);
  }
});

app.listen(port, () => {
  console.log(`Server is connected at port....${port}`);
});
