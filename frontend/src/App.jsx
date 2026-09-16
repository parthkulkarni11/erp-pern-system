import { useState } from "react";
import axios from "axios";

function App() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const [enquiryId, setEnquiryId] = useState("");
  const [quotationData, setQuotationData] = useState(null);

  const createEnquiry = async () => {
    try {
      await axios.post("http://localhost:5000/enquiries", {
        customer_name: customer,
        product,
        quantity: Number(quantity)
      });
      alert("Enquiry Created");
    } catch {
      alert("Error");
    }
  };

  const createQuotation = async () => {
    try {
      await axios.post("http://localhost:5000/quotations", {
        enquiry_id: Number(enquiryId),
        items: [
          {
            product,
            quantity: Number(quantity),
            unit_price: 100,
            discount: 10,
            gst: 18
          }
        ]
      });
      alert("Quotation Created");
    } catch {
      alert("Error");
    }
  };

  const getQuotation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quotations/${enquiryId}`
      );
      setQuotationData(res.data);
    } catch {
      alert("Error fetching");
    }
  };

  return (
    <div style={styles.page}>
      {/* GLOBAL FONT & RESET INJECTION */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #FAF6F0; }
        input::placeholder { color: #8A9A94; }
        @media (max-width: 900px) {
          .erp-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* TOP NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <div style={styles.logoBadge}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8E7C9" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span style={styles.brandTitle}>Enterprise ERP Control</span>
        </div>
      </nav>

      <div style={styles.contentWrapper}>
        {/* DASHBOARD HEADER */}
        <header style={styles.header}>
          <span style={styles.categoryBadge}>Commercial Operations Suite</span>
          <h1 style={styles.title}>Quotation & Sales Management</h1>
          <p style={styles.subtitle}>
            Manage end-to-end sales pipelines, convert inquiries into formal quotations, and audit financial totals.
          </p>
        </header>

        {/* 3-COLUMN FULL-WIDTH GRID */}
        <div style={styles.gridContainer} className="erp-grid-container">
          
          {/* STEP 1: CREATE ENQUIRY */}
          <div style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.cardHeader}>
                <div style={styles.stepBadge}>1</div>
                <div>
                  <h2 style={styles.heading}>Create Enquiry</h2>
                  <p style={styles.subHeading}>Log customer demand details</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Customer Name</label>
                  <input
                    placeholder="e.g. Acme Corporation"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Product SKU / Item</label>
                  <input
                    placeholder="e.g. Industrial Sensor Module"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Quantity</label>
                  <input
                    placeholder="e.g. 50"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            <button onClick={createEnquiry} style={styles.buttonPrimary}>
              Submit Enquiry
            </button>
          </div>

          {/* STEP 2: CREATE QUOTATION */}
          <div style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.cardHeader}>
                <div style={styles.stepBadge}>2</div>
                <div>
                  <h2 style={styles.heading}>Generate Quotation</h2>
                  <p style={styles.subHeading}>Convert enquiry to cost structure</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Enquiry Reference ID</label>
                  <input
                    placeholder="e.g. 101"
                    value={enquiryId}
                    onChange={(e) => setEnquiryId(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.helperBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>Automatically applies 18% GST and 10% promotional discount to calculations.</span>
                </div>
              </div>
            </div>

            <button onClick={createQuotation} style={styles.buttonPrimary}>
              Create Quotation
            </button>
          </div>

          {/* STEP 3: QUOTATION AUDIT */}
          <div style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.cardHeader}>
                <div style={styles.stepBadge}>3</div>
                <div>
                  <h2 style={styles.heading}>Quotation Audit</h2>
                  <p style={styles.subHeading}>Fetch real-time quotation record</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <button onClick={getQuotation} style={styles.buttonSecondary}>
                  Fetch Data
                </button>

                {quotationData ? (
                  <div style={styles.resultBox}>
                    <div style={styles.totalRow}>
                      <span style={styles.totalLabel}>Total Valuation</span>
                      <span style={styles.totalValue}>₹{quotationData.total}</span>
                    </div>

                    <div style={styles.itemsContainer}>
                      <span style={styles.sectionHeader}>Line Items</span>
                      {quotationData.items.map((item, i) => (
                        <div key={i} style={styles.itemCard}>
                          <span style={styles.itemName}>{item.product}</span>
                          <span style={styles.itemQty}>Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={styles.emptyState}>
                    Enter an Enquiry ID in Step 2 and click <strong>"Fetch Data"</strong> to preview quotation metrics.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// STYLING WITH EXACT COLOR COMBINATION & FIT FIXES
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FAF6F0",
    color: "#064E3B",
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box"
  },

  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #E8DEC8",
    boxShadow: "0 1px 3px rgba(6, 78, 59, 0.04)",
    width: "100%"
  },

  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logoBadge: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "#064E3B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  brandTitle: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#064E3B",
    letterSpacing: "-0.2px"
  },

  contentWrapper: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "24px 24px 40px 24px",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },

  header: {
    marginBottom: "24px",
    textAlign: "left"
  },

  categoryBadge: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#064E3B",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
    display: "inline-block"
  },

  title: {
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "#064E3B",
    margin: "0 0 4px 0"
  },

  subtitle: {
    fontSize: "14px",
    color: "#3B5C52",
    margin: 0,
    maxWidth: "750px"
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    width: "100%",
    alignItems: "stretch"
  },

  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8DEC8",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 12px rgba(6, 78, 59, 0.03)",
    minWidth: 0
  },

  cardTop: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid #F3EDE0",
    paddingBottom: "14px",
    marginBottom: "16px"
  },

  stepBadge: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    backgroundColor: "#F8E7C9",
    border: "1px solid #E2D1AF",
    color: "#064E3B",
    fontSize: "13px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },

  heading: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#064E3B",
    margin: 0
  },

  subHeading: {
    fontSize: "12px",
    color: "#4A635A",
    margin: "1px 0 0 0"
  },

  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "16px",
    width: "100%"
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%"
  },

  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#064E3B"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "#FAF6F0",
    border: "1px solid #D8CEB9",
    borderRadius: "8px",
    color: "#064E3B",
    fontSize: "13px",
    fontWeight: "500",
    outline: "none",
    fontFamily: "inherit"
  },

  helperBox: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    padding: "12px",
    backgroundColor: "#F8E7C9",
    border: "1px solid #E2D1AF",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#064E3B",
    lineHeight: "1.4",
    fontWeight: "500"
  },

  buttonPrimary: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#064E3B",
    color: "#F8E7C9",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(6, 78, 59, 0.15)",
    fontFamily: "inherit",
    marginTop: "auto"
  },

  buttonSecondary: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#F8E7C9",
    color: "#064E3B",
    border: "1px solid #064E3B",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit"
  },

  resultBox: {
    padding: "14px",
    backgroundColor: "#FAF6F0",
    border: "1px solid #E8DEC8",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%"
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8DEC8",
    paddingBottom: "10px"
  },

  totalLabel: {
    fontSize: "11px",
    color: "#4A635A",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700"
  },

  totalValue: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#064E3B"
  },

  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  sectionHeader: {
    fontSize: "10px",
    color: "#4A635A",
    textTransform: "uppercase",
    fontWeight: "700"
  },

  itemCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #E8DEC8"
  },

  itemName: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#064E3B"
  },

  itemQty: {
    fontSize: "11px",
    color: "#064E3B",
    fontWeight: "700",
    backgroundColor: "#F8E7C9",
    padding: "2px 6px",
    borderRadius: "4px"
  },

  emptyState: {
    padding: "20px 12px",
    textAlign: "center",
    fontSize: "12px",
    color: "#4A635A",
    border: "1px dashed #D8CEB9",
    borderRadius: "8px",
    backgroundColor: "#FAF6F0",
    lineHeight: "1.4"
  }
};

export default App;