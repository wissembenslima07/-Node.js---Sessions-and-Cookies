const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");

const app = express();
connectDB();

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", appController.landing_page);
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);
app.get("/dashboard", isAuth, appController.dashboard_get);
app.post("/logout", isAuth, appController.logout_post);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
}); 
//The end 