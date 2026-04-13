<<<<<<< HEAD
# Database Setup Guide

## Current Status
❌ MySQL is not installed or not running on your system.

## Step-by-Step Setup

### Step 1: Install MySQL

1. **Download MySQL Installer:**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Download "MySQL Installer for Windows"
   - Choose the "Full" or "Developer Default" installation

2. **Install MySQL:**
   - Run the installer
   - Choose "Developer Default" setup type
   - Complete the installation wizard
   - **IMPORTANT:** When asked for root password, set it to: `Shraddha_247`
   - Make sure MySQL Server service is set to start automatically

### Step 2: Start MySQL Service

1. **Open Command Prompt as Administrator:**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Command Prompt (Admin)"

2. **Start MySQL Service:**
   ```cmd
   net start MySQL80
   ```
   (If your service has a different name, check with: `sc query | findstr MySQL`)

### Step 3: Create Database and Table

1. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   ```

2. **Run setup script:**
   ```powershell
   node setup_database.js
   ```

   You should see:
   ```
   ✅ Connected to MySQL server!
   ✅ Database 'DisasterReliefManagement' created/verified
   ✅ Table 'disaster_records' created/verified
   ✅ Database setup completed successfully!
   ```

### Step 4: Verify Connection

Run the test script:
```powershell
node test_connection.js
```

### Step 5: Restart Your Server

If your server is running, restart it:
```powershell
node server.js
```

## Alternative: Use MySQL Workbench

1. **Install MySQL Workbench** (comes with MySQL Installer)
2. **Open MySQL Workbench**
3. **Connect to localhost** (password: `Shraddha_247`)
4. **Open SQL Script:**
   - File → Open SQL Script
   - Select: `backend/setup_database.sql`
5. **Execute the script** (Click the lightning bolt icon)

## Quick Commands Reference

```powershell
# Check MySQL status
node check_mysql.js

# Setup database
node setup_database.js

# Test connection
node test_connection.js

# Start server
node server.js
```

## Troubleshooting

### MySQL Service Won't Start
```cmd
# Check service status
sc query MySQL80

# Start service manually
net start MySQL80

# If service doesn't exist, reinstall MySQL
```

### Wrong Password
Update password in these files:
- `backend/server.js` (line 20)
- `backend/setup_database.js` (line 6)
- `backend/test_connection.js` (line 6)

### Port Already in Use
If port 3306 is in use, you may have multiple MySQL instances. Check with:
```cmd
netstat -ano | findstr :3306
```

## After Setup

Once database is connected:
- ✅ Your server will show: "✅ Connected to MySQL Database"
- ✅ You can add disaster records via the web interface
- ✅ Search and analytics will work with real data
- ✅ All API endpoints will function properly

## Current Project Status

Your project is **running** at: http://localhost:3000

The frontend works without database, but features will show empty/default data until MySQL is set up.

=======
# Database Setup Guide

## Current Status
❌ MySQL is not installed or not running on your system.

## Step-by-Step Setup

### Step 1: Install MySQL

1. **Download MySQL Installer:**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Download "MySQL Installer for Windows"
   - Choose the "Full" or "Developer Default" installation

2. **Install MySQL:**
   - Run the installer
   - Choose "Developer Default" setup type
   - Complete the installation wizard
   - **IMPORTANT:** When asked for root password, set it to: `Shraddha_247`
   - Make sure MySQL Server service is set to start automatically

### Step 2: Start MySQL Service

1. **Open Command Prompt as Administrator:**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Command Prompt (Admin)"

2. **Start MySQL Service:**
   ```cmd
   net start MySQL80
   ```
   (If your service has a different name, check with: `sc query | findstr MySQL`)

### Step 3: Create Database and Table

1. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   ```

2. **Run setup script:**
   ```powershell
   node setup_database.js
   ```

   You should see:
   ```
   ✅ Connected to MySQL server!
   ✅ Database 'DisasterReliefManagement' created/verified
   ✅ Table 'disaster_records' created/verified
   ✅ Database setup completed successfully!
   ```

### Step 4: Verify Connection

Run the test script:
```powershell
node test_connection.js
```

### Step 5: Restart Your Server

If your server is running, restart it:
```powershell
node server.js
```

## Alternative: Use MySQL Workbench

1. **Install MySQL Workbench** (comes with MySQL Installer)
2. **Open MySQL Workbench**
3. **Connect to localhost** (password: `Shraddha_247`)
4. **Open SQL Script:**
   - File → Open SQL Script
   - Select: `backend/setup_database.sql`
5. **Execute the script** (Click the lightning bolt icon)

## Quick Commands Reference

```powershell
# Check MySQL status
node check_mysql.js

# Setup database
node setup_database.js

# Test connection
node test_connection.js

# Start server
node server.js
```

## Troubleshooting

### MySQL Service Won't Start
```cmd
# Check service status
sc query MySQL80

# Start service manually
net start MySQL80

# If service doesn't exist, reinstall MySQL
```

### Wrong Password
Update password in these files:
- `backend/server.js` (line 20)
- `backend/setup_database.js` (line 6)
- `backend/test_connection.js` (line 6)

### Port Already in Use
If port 3306 is in use, you may have multiple MySQL instances. Check with:
```cmd
netstat -ano | findstr :3306
```

## After Setup

Once database is connected:
- ✅ Your server will show: "✅ Connected to MySQL Database"
- ✅ You can add disaster records via the web interface
- ✅ Search and analytics will work with real data
- ✅ All API endpoints will function properly

## Current Project Status

Your project is **running** at: http://localhost:3000

The frontend works without database, but features will show empty/default data until MySQL is set up.

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
