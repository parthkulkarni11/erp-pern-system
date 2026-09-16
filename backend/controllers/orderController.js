const pool = require("../db");

// CONVERT QUOTATION TO ORDER
exports.convertToOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await pool.query(
      "SELECT * FROM quotations WHERE id=$1 AND status='ACCEPTED'",
      [id]
    );

    if (check.rows.length === 0) {
      return res.status(400).json({ message: "Invalid quotation" });
    }

    const existing = await pool.query(
      "SELECT * FROM sales_orders WHERE quotation_id=$1",
      [id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Already converted" });
    }

    const order = await pool.query(
      "INSERT INTO sales_orders (quotation_id, status, total) VALUES ($1,'PENDING',$2) RETURNING *",
      [id, check.rows[0].total]
    );

    res.json(order.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};