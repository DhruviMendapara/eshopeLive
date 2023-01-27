const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const authjwt=require("./helpers/jwt");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authjwt);

const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const orderitemRoutes=require("./routes/ordersitems");

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orderitem",orderitemRoutes);
app.use("/orders", ordersRoutes);


//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection ..");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is Running:${PORT}`);
});
