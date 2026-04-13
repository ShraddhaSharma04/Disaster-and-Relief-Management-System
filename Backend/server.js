<<<<<<< HEAD
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const os = require("os");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../Frontend")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247",
  database: "disasterreliefmanagement"
});

const JWT_SECRET = "your_super_secret_key_123";

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("⚠️ Continuing without database connection...");
    return;
  }

  console.log("✅ Connected to MySQL Database");

  db.query("SHOW TABLES LIKE 'disaster_records'", (err, results) => {
    if (err || results.length === 0) {
      console.log("⚠️ Table 'disaster_records' not found.");
    } else {
      db.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
        if (!err) {
          console.log(`📊 Database ready with ${results[0].count} records`);
        }
      });
    }
  });

  db.query("SHOW TABLES LIKE 'users'", (err, results) => {
    if (err || results.length === 0) {
      console.log("⚠️ Table 'users' not found. Create it before using login/register.");
    } else {
      console.log("✅ Users table found");
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
}

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        console.error("❌ Register check error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertSql =
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

        db.query(
          insertSql,
          [name, email, hashedPassword, role || "admin"],
          (err, result) => {
            if (err) {
              console.error("❌ Registration error:", err);
              return res.status(500).json({ error: "Registration failed" });
            }

            return res.status(201).json({
              message: "✅ User registered successfully",
              userId: result.insertId
            });
          }
        );
      } catch (hashError) {
        console.error("❌ Password hash error:", hashError);
        return res.status(500).json({ error: "Password hashing failed" });
      }
    });
  } catch (error) {
    console.error("❌ Register route error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        message: "✅ Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (compareError) {
      console.error("❌ Password compare error:", compareError);
      return res.status(500).json({ error: "Login failed" });
    }
  });
});

// Get all disasters
app.get("/api/disasters", (req, res) => {
  const query = "SELECT * FROM disaster_records ORDER BY Date DESC LIMIT 100";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.json(results);
  });
});

// Add disaster record
app.post("/api/disasters", authenticateToken, (req, res) => {
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

  db.query(
    sql,
    [
      disasterId,
      DisasterName,
      DisasterType,
      Severity,
      Date,
      CountryName,
      State,
      City,
      Deaths || 0,
      Injured || 0,
      Homeless || 0,
      TotalDamage_USD || 0
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({
          error: "Failed to insert record",
          details: err.message
        });
      }

      return res.json({
        message: "✅ Disaster record added successfully",
        id: result.insertId
      });
    }
  );
});

// Search disasters
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

  db.query(
    searchQuery,
    [searchTerm, searchTerm, searchTerm, searchTerm],
    (err, results) => {
      if (err) {
        console.error("❌ Search error:", err);
        return res.status(500).json({ error: "Search failed" });
      }
      return res.json(results);
    }
  );
});

// Analytics
app.get("/api/analytics", (req, res) => {
  const queries = {
    byType:
      "SELECT DisasterType, COUNT(*) as Total, SUM(Deaths) as TotalDeaths, SUM(TotalDamage_USD) as Damage FROM disaster_records GROUP BY DisasterType",
    bySeverity:
      "SELECT Severity, COUNT(*) as Count FROM disaster_records GROUP BY Severity",
    byCountry:
      "SELECT CountryName, COUNT(*) as Count, SUM(Deaths) as Deaths, SUM(TotalDamage_USD) as Damage FROM disaster_records GROUP BY CountryName ORDER BY Count DESC LIMIT 10",
    totalStats:
      "SELECT COUNT(*) as totalDisasters, SUM(Deaths) as totalDeaths, SUM(TotalDamage_USD) as totalDamage, COUNT(DISTINCT CountryName) as countriesCount FROM disaster_records"
  };

  Promise.all([
    db.promise().query(queries.byType),
    db.promise().query(queries.bySeverity),
    db.promise().query(queries.byCountry),
    db.promise().query(queries.totalStats)
  ])
    .then(([typeResults, severityResults, countryResults, statsResults]) => {
      return res.json({
        byType: typeResults[0],
        bySeverity: severityResults[0],
        byCountry: countryResults[0],
        stats: statsResults[0][0]
      });
    })
    .catch((err) => {
      console.error("❌ Analytics error:", err);
      return res.json({
        byType: [],
        bySeverity: [],
        byCountry: [],
        stats: {
          totalDisasters: 0,
          totalDeaths: 0,
          totalDamage: 0,
          countriesCount: 0
        }
      });
    });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});

const networkInterfaces = os.networkInterfaces();
let localIP = "localhost";

for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.internal) {
      localIP = iface.address;
      break;
    }
  }
  if (localIP !== "localhost") break;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Local access: http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://${localIP}:${PORT}`);
  console.log(`   - Login: http://${localIP}:${PORT}/`);
  console.log(`   - Register: http://${localIP}:${PORT}/register.html`);
  console.log(`   - Dashboard: http://${localIP}:${PORT}/index.html`);
  console.log(`   - Disasters: http://${localIP}:${PORT}/disasters.html`);
  console.log(`   - Analytics: http://${localIP}:${PORT}/analytics.html`);
  console.log(`   - Search: http://${localIP}:${PORT}/search.html`);
});
=======
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
>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
