<<<<<<< HEAD
// Test MySQL Database Connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});

console.log("🔍 Testing MySQL connection...");

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("\n💡 Troubleshooting:");
    console.log("1. Make sure MySQL is running");
    console.log("2. Check if password is correct");
    console.log("3. Verify database exists");
    process.exit(1);
  }
  
  console.log("✅ Successfully connected to MySQL!");
  
  // Test query
  db.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
    if (err) {
      console.log("⚠️  Table 'disaster_records' doesn't exist yet");
      console.log("📝 Run setup_database.sql to create it");
    } else {
      console.log(`📊 Found ${results[0].count} records in disaster_records table`);
    }
    
    db.end();
    console.log("\n✅ Connection test completed!");
  });
});

=======
// Test MySQL Database Connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});

console.log("🔍 Testing MySQL connection...");

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("\n💡 Troubleshooting:");
    console.log("1. Make sure MySQL is running");
    console.log("2. Check if password is correct");
    console.log("3. Verify database exists");
    process.exit(1);
  }
  
  console.log("✅ Successfully connected to MySQL!");
  
  // Test query
  db.query("SELECT COUNT(*) as count FROM disaster_records", (err, results) => {
    if (err) {
      console.log("⚠️  Table 'disaster_records' doesn't exist yet");
      console.log("📝 Run setup_database.sql to create it");
    } else {
      console.log(`📊 Found ${results[0].count} records in disaster_records table`);
    }
    
    db.end();
    console.log("\n✅ Connection test completed!");
  });
});

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
