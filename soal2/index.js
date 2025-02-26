const express = require("express");
const userRoutes = require("./controller/users.js");
const plainRoutes = require("./controller/plain.js");
const cors = require("cors");

const app = express();
const PORT = 2000;

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

app.get("/", (req, res) => res.send("HELLO FROM HOMEPAGE"));

app.use("/users", userRoutes);
app.use("/plainsql", plainRoutes);
