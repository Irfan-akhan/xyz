var express = require("express");
var next = require("next");
var { json, urlencoded } = require("body-parser");

var cors = require("cors");
const dbConnect = require("./utils/db");
const postRouter = require("./resources/post/post.router");
const bookingRouter = require("./resources/booking/booking.router");
const priorityRouter = require("./resources/priority/priority.router");
const hotelRouter = require("./resources/hotel/hotel.router");
const carRouter = require("./resources/car/car.router");
const currencyRouter = require("./resources/currency/currency.router");
const fleetRouter = require("./resources/fleet/fleet.router");
const vehicleRouter = require("./resources/vehicles/vehicles.router");
const userRouter = require("./resources/user/user.router");
const auth = require("./utils/auth");
const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

function sign(req, res, next) {
  console.log("In Middleware");
  next();
}
app.prepare().then(() => {
  const server = express();
  dbConnect();

  // middleware
  server.use(cors());
  server.use(json());
  server.use(urlencoded({ extended: true }));
  server.use(express.static("./src/public"));
  server.use("/api/booking/airport", bookingRouter);
  server.use("/api/booking/fleet", fleetRouter);
  server.use("/api/booking/hotel", hotelRouter);
  server.use("/api/booking/priority", priorityRouter);
  server.use("/api/rates", currencyRouter);
  server.use("/api/booking/car", carRouter);
  server.use("/api/posts", postRouter);
  server.use("/api/users", sign, userRouter);
  server.use("/api/vehicles", vehicleRouter);
  server.use("/api/drive", (req, res) => {
    console.log("files", req.body);
    console.log("files", req.files);
  });

  server.post("/api/signin", auth.signIn);
  server.post("/api/signup", auth.signUp);
  // next handler
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
