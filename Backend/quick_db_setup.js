// Quick Database Setup - Connect to Remote MySQL
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Quick Database Connection Setup\n');
console.log('Enter the IP address of the laptop that has MySQL with the dataset:\n');

rl.question('MySQL Server IP Address: ', (mysqlIP) => {
  if (!mysqlIP) {
    console.log('❌ IP address is required!');
    rl.close();
    process.exit(1);
  }

  // Update server.js
  const serverPath = path.join(__dirname, 'server.js');
  let serverContent = fs.readFileSync(serverPath, 'utf8');
  
  // Find and replace MySQL connection
  const connectionRegex = /const db = mysql\.createConnection\(\{[\s\S]*?host:\s*"[^"]*",[\s\S]*?user:\s*"[^"]*",[\s\S]*?password:\s*"[^"]*",[\s\S]*?database:\s*"[^"]*"[\s\S]*?\}\);/;
  
  const newConnection = `const db = mysql.createConnection({
  host: "${mysqlIP}",
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});`;
  
  if (connectionRegex.test(serverContent)) {
    serverContent = serverContent.replace(connectionRegex, newConnection);
  } else {
    // Fallback: replace just the host
    serverContent = serverContent.replace(
      /host:\s*"[^"]*"/,
      `host: "${mysqlIP}"`
    );
  }
  
  fs.writeFileSync(serverPath, serverContent);

  console.log('\n✅ Server configuration updated!');
  console.log(`📊 MySQL will connect to: ${mysqlIP}`);
  console.log('\n🔄 Please restart your server:');
  console.log('   1. Stop current server (Ctrl+C)');
  console.log('   2. Run: node server.js');
  console.log('\n🌐 Your URL with database: http://10.108.94.166:3000');
  
  rl.close();
});

