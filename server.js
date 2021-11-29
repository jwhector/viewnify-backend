const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const allroutes = require("./controllers")
const sequelize = require('sequelize')


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

app.use(allroutes)

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});