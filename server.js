const express = require("express");
const mongoose = require('mongoose')
const logger = require("morgan");
const cors = rwquire("cors")
const allroutes = require("./controllers")

const PORT = process.env.PORT || 3005

const app = express();

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

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/viewnify',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }
  )

app.use('/', allroutes)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});