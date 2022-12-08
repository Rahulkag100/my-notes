const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
app.use(express.json())


app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes);

// -----------------------Deployment Start ---------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -----------------------Deployment End -----------------------------

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000;


app.listen(PORT,console.log(`server started on Port ${PORT}`));
