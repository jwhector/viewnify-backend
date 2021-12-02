const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const routes = require("./controllers")
const sequelize = require('./config/sequelize.js')


const app = express();
const PORT = process.env.PORT || 3005

//LOCAL if running local uncomment this if your running locally
// app.use(cors())
//DEPLOYED kept this uncommented for main git/heroku
app.use(cors({
    origin:[process.env.DEPLOYED_WEBSITE]
}))

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {Dislike,Like,Friend,User} = require('./models')
app.use(routes)

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});