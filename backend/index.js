require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/enquiries", require("./routes/enquiryRoutes"));
app.use("/quotations", require("./routes/quotationRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

// ✅ TEST
const pool = require("./db");

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

// ✅ LAST
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
