const pool = require("../db");

// CREATE QUOTATION
exports.createQuotation = async (req, res) => {
  try {
    const { enquiry_id, items } = req.body;

    let total = 0;

    // calculate total
    items.forEach(item => {
      const amount =
        item.quantity * item.unit_price -
        item.discount +
        (item.quantity * item.unit_price * item.gst) / 100;

      total += amount;
    });

    // insert quotation
    const quotation = await pool.query(
      "INSERT INTO quotations (enquiry_id, total) VALUES ($1,$2) RETURNING *",
      [enquiry_id, total]
    );

    const quotation_id = quotation.rows[0].id;

    // insert items
    for (let item of items) {
      const final_amount =
        item.quantity * item.unit_price -
        item.discount +
        (item.quantity * item.unit_price * item.gst) / 100;

      await pool.query(
        `INSERT INTO quotation_items
        (quotation_id, product, quantity, unit_price, discount, gst, final_amount)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          quotation_id,
          item.product,
          item.quantity,
          item.unit_price,
          item.discount,
          item.gst,
          final_amount
        ]
      );
    }

    res.json({ message: "Quotation created successfully", quotation_id });

  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// GET ALL QUOTATIONS
exports.getQuotations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quotations");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
};

// GET SINGLE QUOTATION WITH ITEMS (FINAL CLEAN VERSION)
exports.getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;

    const quotationResult = await pool.query(
      "SELECT * FROM quotations WHERE id=$1",
      [id]
    );

    // 🔥 SAFETY CHECK (IMPORTANT)
    if (quotationResult.rows.length === 0) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const itemsResult = await pool.query(
      "SELECT * FROM quotation_items WHERE quotation_id=$1",
      [id]
    );

    const quotation = quotationResult.rows[0];

    // ✅ CLEAN RESPONSE
    res.json({
      id: quotation.id,
      enquiry_id: quotation.enquiry_id,
      status: quotation.status || "DRAFT",
      total: Number(quotation.total),
      items: itemsResult.rows.map(item => ({
        product: item.product,
        quantity: item.quantity,
        unit_price: Number(item.unit_price),
        discount: Number(item.discount),
        gst: Number(item.gst),
        final_amount: Number(item.final_amount)
      }))
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};