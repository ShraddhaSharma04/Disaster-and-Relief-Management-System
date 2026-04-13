<<<<<<< HEAD
// Setup Database Script - Creates database and table
const mysql = require("mysql2");

// First connect without database to create it
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247"
});

console.log("🔍 Connecting to MySQL...");

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    console.log("\n💡 Please check:");
    console.log("1. MySQL is installed and running");
    console.log("2. MySQL password is correct (currently: Shraddha_247)");
    console.log("3. MySQL service is started");
    console.log("\n📝 To start MySQL service, run:");
    console.log("   net start MySQL80  (or your MySQL service name)");
    process.exit(1);
  }

  console.log("✅ Connected to MySQL server!");

  // Create database
  connection.query("CREATE DATABASE IF NOT EXISTS DisasterReliefManagement", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err.message);
      connection.end();
      process.exit(1);
    }
    console.log("✅ Database 'DisasterReliefManagement' created/verified");

    // Use the database
    connection.query("USE DisasterReliefManagement", (err) => {
      if (err) {
        console.error("❌ Error using database:", err.message);
        connection.end();
        process.exit(1);
      }

      // Create table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS disaster_records (
          DisasterID VARCHAR(50) PRIMARY KEY,
          DisasterName VARCHAR(100),
          DisasterType VARCHAR(100),
          Severity VARCHAR(50),
          Date DATE,
          CountryName VARCHAR(100),
          State VARCHAR(100),
          City VARCHAR(100),
          Deaths INT DEFAULT 0,
          Injured INT DEFAULT 0,
          Homeless INT DEFAULT 0,
          TotalDamage_USD DECIMAL(15,2) DEFAULT 0,
          AgencyID VARCHAR(50),
          AgencyName VARCHAR(100),
          AgencyContact VARCHAR(100),
          ResourceID VARCHAR(50),
          ResourcesProvided VARCHAR(255),
          ResourceQuantity INT DEFAULT 0,
          ResourceCost_USD DECIMAL(10,2) DEFAULT 0,
          StartDate DATE,
          EndDate DATE,
          Status VARCHAR(50)
        )
      `;

      connection.query(createTableSQL, (err) => {
        if (err) {
          console.error("❌ Error creating table:", err.message);
          connection.end();
          process.exit(1);
        }
        console.log("✅ Table 'disaster_records' created/verified");

        // Check current records
        connection.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
          if (err) {
            console.error("❌ Error querying table:", err.message);
          } else {
            console.log(`📊 Current records in table: ${results[0].count}`);
          }

          connection.end();
          console.log("\n✅ Database setup completed successfully!");
          console.log("🚀 Your server should now be able to connect to the database!");
        });
      });
    });
  });
});

=======
// Setup Database Script - Creates database and table
const mysql = require("mysql2");

// First connect without database to create it
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247"
});

console.log("🔍 Connecting to MySQL...");

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    console.log("\n💡 Please check:");
    console.log("1. MySQL is installed and running");
    console.log("2. MySQL password is correct (currently: Shraddha_247)");
    console.log("3. MySQL service is started");
    console.log("\n📝 To start MySQL service, run:");
    console.log("   net start MySQL80  (or your MySQL service name)");
    process.exit(1);
  }

  console.log("✅ Connected to MySQL server!");

  // Create database
  connection.query("CREATE DATABASE IF NOT EXISTS DisasterReliefManagement", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err.message);
      connection.end();
      process.exit(1);
    }
    console.log("✅ Database 'DisasterReliefManagement' created/verified");

    // Use the database
    connection.query("USE DisasterReliefManagement", (err) => {
      if (err) {
        console.error("❌ Error using database:", err.message);
        connection.end();
        process.exit(1);
      }

      // Create table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS disaster_records (
          DisasterID VARCHAR(50) PRIMARY KEY,
          DisasterName VARCHAR(100),
          DisasterType VARCHAR(100),
          Severity VARCHAR(50),
          Date DATE,
          CountryName VARCHAR(100),
          State VARCHAR(100),
          City VARCHAR(100),
          Deaths INT DEFAULT 0,
          Injured INT DEFAULT 0,
          Homeless INT DEFAULT 0,
          TotalDamage_USD DECIMAL(15,2) DEFAULT 0,
          AgencyID VARCHAR(50),
          AgencyName VARCHAR(100),
          AgencyContact VARCHAR(100),
          ResourceID VARCHAR(50),
          ResourcesProvided VARCHAR(255),
          ResourceQuantity INT DEFAULT 0,
          ResourceCost_USD DECIMAL(10,2) DEFAULT 0,
          StartDate DATE,
          EndDate DATE,
          Status VARCHAR(50)
        )
      `;

      connection.query(createTableSQL, (err) => {
        if (err) {
          console.error("❌ Error creating table:", err.message);
          connection.end();
          process.exit(1);
        }
        console.log("✅ Table 'disaster_records' created/verified");

        // Check current records
        connection.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
          if (err) {
            console.error("❌ Error querying table:", err.message);
          } else {
            console.log(`📊 Current records in table: ${results[0].count}`);
          }

          connection.end();
          console.log("\n✅ Database setup completed successfully!");
          console.log("🚀 Your server should now be able to connect to the database!");
        });
      });
    });
  });
});

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
