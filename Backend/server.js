// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247",
  database: "disasterreliefmanagement"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("⚠️  Continuing without database connection...");
    console.log("📝 To set up database:");
    console.log("   1. Install MySQL from: https://dev.mysql.com/downloads/installer/");
    console.log("   2. Set root password to: Shraddha_247");
    console.log("   3. Run: node setup_database.js");
    console.log("   4. Restart the server");
    return;
  }
  console.log("✅ Connected to MySQL Database");
  
  // Verify table exists
  db.query("SHOW TABLES LIKE 'disaster_records'", (err, results) => {
    if (err || results.length === 0) {
      console.log("⚠️  Table 'disaster_records' not found. Run: node setup_database.js");
    } else {
      db.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
        if (!err) {
          console.log(`📊 Database ready with ${results[0].count} records`);
        }
      });
    }
  });
});

// ========== API ROUTES ==========

// GET all disaster records
app.get("/api/disasters", (req, res) => {
  const query = "SELECT * FROM disaster_records ORDER BY Date DESC LIMIT 100";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(results);
  });
});

// POST - Add new disaster record
app.post("/api/disasters", (req, res) => {
  const {
    DisasterID,
    DisasterName,
    DisasterType,
    Severity,
    Date,
    CountryName,
    State,
    City,
    Deaths,
    Injured,
    Homeless,
    TotalDamage_USD
  } = req.body;

  const sql = `
    INSERT INTO disaster_records (
      DisasterID, DisasterName, DisasterType, Severity, Date, CountryName, State, City,
      Deaths, Injured, Homeless, TotalDamage_USD
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const disasterId = DisasterID || `D${Date.now().toString().slice(-4)}`;

  db.query(sql, [
    disasterId,
    DisasterName, DisasterType, Severity, Date, CountryName, State, City,
    Deaths || 0, Injured || 0, Homeless || 0, TotalDamage_USD || 0
  ], (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      res.status(500).json({ error: "Failed to insert record", details: err.message });
      return;
    }
    res.json({ message: "✅ Disaster record added successfully", id: result.insertId });
  });
});

// SEARCH disasters
app.get("/api/search", (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.json([]);
  }
  
  const searchQuery = `
    SELECT * FROM disaster_records 
    WHERE DisasterName LIKE ? 
       OR DisasterType LIKE ? 
       OR CountryName LIKE ? 
       OR City LIKE ?
    ORDER BY Date DESC
    LIMIT 50
  `;
  
  const searchTerm = `%${query}%`;
  db.query(searchQuery, [searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("❌ Search error:", err);
      res.status(500).json({ error: "Search failed" });
      return;
    }
    res.json(results);
  });
});

// GET analytics data
app.get("/api/analytics", (req, res) => {
  const queries = {
    byType: "SELECT DisasterType, COUNT(*) as Total, SUM(Deaths) as TotalDeaths, SUM(TotalDamage_USD) as Damage FROM disaster_records GROUP BY DisasterType",
    bySeverity: "SELECT Severity, COUNT(*) as Count FROM disaster_records GROUP BY Severity",
    byCountry: "SELECT CountryName, COUNT(*) as Count, SUM(Deaths) as Deaths, SUM(TotalDamage_USD) as Damage FROM disaster_records GROUP BY CountryName ORDER BY Count DESC LIMIT 10",
    totalStats: "SELECT COUNT(*) as totalDisasters, SUM(Deaths) as totalDeaths, SUM(TotalDamage_USD) as totalDamage, COUNT(DISTINCT CountryName) as countriesCount FROM disaster_records"
  };

  Promise.all([
    db.promise().query(queries.byType),
    db.promise().query(queries.bySeverity),
    db.promise().query(queries.byCountry),
    db.promise().query(queries.totalStats)
  ]).then(([typeResults, severityResults, countryResults, statsResults]) => {
    res.json({
      byType: typeResults[0],
      bySeverity: severityResults[0],
      byCountry: countryResults[0],
      stats: statsResults[0][0]
    });
  }).catch(err => {
    console.error("❌ Analytics error:", err);
    // Return default stats if query fails
    res.json({
      byType: [],
      bySeverity: [],
      byCountry: [],
      stats: { totalDisasters: 0, totalDeaths: 0, totalDamage: 0, countriesCount: 0 }
    });
  });
});

// Root route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
const os = require('os');
const networkInterfaces = os.networkInterfaces();
let localIP = 'localhost';

// Get local IP address
for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIP = iface.address;
      break;
    }
  }
  if (localIP !== 'localhost') break;
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Local access: http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://${localIP}:${PORT}`);
  console.log(`\n📱 Access from other devices on same network:`);
  console.log(`   Main URL: http://${localIP}:${PORT}`);
  console.log(`   - Dashboard: http://${localIP}:${PORT}/`);
  console.log(`   - Disasters: http://${localIP}:${PORT}/disasters.html`);
  console.log(`   - Analytics: http://${localIP}:${PORT}/analytics.html`);
  console.log(`   - Search: http://${localIP}:${PORT}/search.html`);
});
