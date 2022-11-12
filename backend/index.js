// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
// Initialise the app
let app = express();
var cors = require("cors");

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

let mongoDb =
  "mongodb+srv://cs3219-otot:8A6DEOHcSbGXKsFK@cluster0.i4fbx0o.mongodb.net/?retryWrites=true&w=majority";
// let mongoDb =   "mongodb://127.0.0.1/backend";

mongoose.connect(mongoDb, { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8004;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Task B Backend on port " + port);
});
