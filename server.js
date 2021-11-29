const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const routes = require("./controllers")
const sequelize = require('./config/sequelize.js')


const app = express();
const PORT = process.env.PORT || 3005

//LOCAL
app.use(cors())
//DEPLOYED
// app.use(cors({
//     origin:[" "]
// }))

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

const {Dislike,Like,Friend,User} = require('./models')
app.use(routes)

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});