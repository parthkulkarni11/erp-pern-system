const pool = require("../db");

exports.createEnquiry = async (req, res) => {
  try {
    const { customer_name, product, quantity } = req.body;

    const result = await pool.query(
      "INSERT INTO enquiries (customer_name, product, quantity) VALUES ($1,$2,$3) RETURNING *",
      [customer_name, product, quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM enquiries");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
};
